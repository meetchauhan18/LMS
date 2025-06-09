import { Box, Container, TextField, Button, IconButton, Typography, Tooltip, Menu, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BiDuplicate, BiEdit, BiSearch } from 'react-icons/bi'
import { FaFilter } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CgAddR } from 'react-icons/cg'
import ReusableTable from '../components/ReuseableComponents/ResuseableTable'
import { localstoragecrudapi } from '../api/localstoragecrudapi'
import { FcDeleteRow } from 'react-icons/fc'
import ResuseableModal from '../components/ReuseableComponents/ResuseableModal'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import ReuseableCard from '../components/ReuseableComponents/ReuseableCard'
import { jsonservercrudapi } from '../api/jsonservercrudapi'

const HomePage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [allBooks, setAllBooks] = useState([]);
  const [bookToDelete, setBookToDelete] = useState('');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [authorFilter, setAuthorFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  
  // Get unique authors from allBooks (filter out undefined/null authors)
  const uniqueAuthors = Array.from(new Set(
    allBooks
      .filter(book => book && book.author)
      .map(book => book.author)
  ));
  


  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const navigate = useNavigate();
  const handleClear = () => setSearchTerm('');

  const handleOpen = (row) => {
    setBookToDelete(row);
    setOpen(true);
  }

  const handleClose = () => {
    if (anchorEl) {
      setAnchorEl(null);
      return
    }
    setOpen(false)
  }
  // Load books from localStorage on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await jsonservercrudapi.getBooks('books');
        setAllBooks(Array.isArray(booksData) ? booksData : []);
      } catch {
        setAllBooks([]);
      }
    };
    fetchBooks();
  }, []);

  // Filter books by search term (case-insensitive, matches book or author)
  const filteredBooks = allBooks.filter(
    (book) =>
      ((book.book && book.book.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (!authorFilter || book.author === authorFilter)
  ) || allBooks;

  // Set loading true on search/filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, authorFilter]);

  useEffect(() => {
    setTimeout(() => {
      if(allBooks || filteredBooks) {
      setIsLoading(false);
    }
    }, 1000)
  }, [filteredBooks])

  const handleEdit = (row) => {
    try {
      navigate(`/edit-book/${row.id}`);
    } catch (error) {
      console.error("error", error);
    }
  }

  console.log(isLoading)

  const handleDelete = async (row) => {
    try {
      await jsonservercrudapi.removeBook('books', row.id);
      // Fetch updated books
      const booksData = await jsonservercrudapi.getBooks('books');
      setAllBooks(Array.isArray(booksData) ? booksData : []);
    } catch (error) {
      console.error('Error deleting book:', error);
    } finally {
      handleClose();
      toast.success(`Successfully Deleted ${row.book}- ${row.author}`)
    }
  }

  const handleDuplicate = async (row) => {
    try {
      const duplicateBook = { ...row, id: uuidv4() };
      await jsonservercrudapi.setBooks('books', duplicateBook);
      // Fetch updated books
      const booksData = await jsonservercrudapi.getBooks('books');
      setAllBooks(Array.isArray(booksData) ? booksData : []);
    } catch (error) {
      console.error('Error duplicating book:', error);
    }
  }

  const handleFilter = (authorName) => {
    setAuthorFilter(authorName);
  }
  const handleClearAuthorFilter = () => {
    setAuthorFilter('');
  };

  const ReusableTableColumns = [
    { label: 'Serial No', field: 'index', sortable: false },
    { label: 'Book', field: 'book', sortable: true },
    { label: 'Author', field: 'author', sortable: true },
  ]

  const ReusableTableActions = [
    {
      icon: <BiEdit size={20} />,
      label: "Edit",
      onClick: (row) => handleEdit(row),
    },
    {
      icon: <FcDeleteRow size={20} />,
      label: "Delete",
      onClick: (row) => handleOpen(row),
    },
    {
      icon: <BiDuplicate size={20} />,
      onClick: (row) => handleDuplicate(row),
    }
  ]

  // Calculate filtered authors and their book counts
  const filteredAuthorBookCounts = filteredBooks.reduce((acc, book) => {
    if (book && book.author) {
      acc[book.author] = (acc[book.author] || 0) + 1;
    }
    return acc;
  }, {});
  const filteredAuthorList = Object.entries(filteredAuthorBookCounts);

  return (
    <Container
      className='main-box'
      sx={{
        minWidth: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: { xs: 'stretch', md: 'flex-start' },
        paddingTop: { xs: '90px', md: '100px' },
        gap: { xs: 2, md: '10px' },
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
        width: { xs: '100%', md: 'auto' },
      }}>
        <Box sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}>
          <ReuseableCard title="Total Authors">
            <Typography>{uniqueAuthors.length}</Typography>
          </ReuseableCard>
          <ReuseableCard title="Total Book">
            <Typography>{allBooks.length}</Typography>
          </ReuseableCard>
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', md: '700px' },
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Container sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            position: 'relative',
            px: { xs: 0, sm: 1 },
            minWidth: 0,
          }}>
            <BiSearch color='#1947DB' size={22} style={{ color: '#888', cursor: 'pointer', position: 'absolute', right: 38, top: '50%', transform: 'translateY(-50%)' }} />
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1, ml: 1, background: 'transparent', border: 'none', boxShadow: 'none', }}
            />
            {searchTerm && (
              <Typography sx={{ cursor: 'pointer', position: 'absolute', right: 72, top: '50%', transform: 'translateY(-50%)' }} onClick={handleClear} size="small">
                clear
              </Typography>
            )}
          </Container>
          <Tooltip title="Filter Books">
            <IconButton onClick={handleClick} sx={{ color: '#1947DB' }}>
              <FaFilter size={23} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            id="author-filter-menu"
            slotProps={{
              paper: {
                style: {
                  maxHeight: 350,
                  width: 300,
                }
              }
            }}
          >
            <MenuItem selected={!authorFilter} onClick={() => { handleClearAuthorFilter(); handleClose(); }}>
              All Authors
            </MenuItem>
            {uniqueAuthors?.map((author, authorIndex) => (
              <MenuItem key={authorIndex} selected={authorFilter === author} onClick={() => { handleFilter(author); handleClose(); }}>
                {author}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="Add Book">
            <IconButton onClick={() => navigate('/add-book')} sx={{ color: '#1947DB' }}>
              <CgAddR size={23} />
            </IconButton>
          </Tooltip>
        </Box>
        {/* Add your book list or other content below */}
        <Box sx={{
          width: 'auto',
          margin: { xs: '10px 0', md: '10px auto' },
          padding: { xs: 1, sm: 2 },
          boxShadow: 1,
          backgroundColor: '#fff',
          borderRadius: 2,
          minWidth: 0,
        }}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            Book List
          </Typography>
          {(searchTerm || authorFilter) && (
            <Button 
              variant="outlined" 
              color="secondary" 
              sx={{ mb: 2, alignSelf: 'flex-end' }}
              onClick={() => { setSearchTerm(''); setAuthorFilter(''); }}
            >
              Clear Filters
            </Button>
          )}
          <ReusableTable columns={ReusableTableColumns} isLoading={isLoading} rows={filteredBooks} actions={ReusableTableActions} />
          <ResuseableModal isLoading={isLoading} open={open} onClose={handleClose} title={'Confirm delete?'} maxWidth={'xs'} actions={[
            <Button key={bookToDelete.id} variant='contained' onClick={() => handleDelete(bookToDelete)}>Delete</Button>
          ]}>
            Are you sure you want to delete {bookToDelete.book} - {bookToDelete.author}?
            This action is reversible.
          </ResuseableModal>
        </Box>
      </Box>
      <Box sx={{
        width: { xs: '100%', md: 'auto' },
        minWidth: { xs: 0, md: '400px' },
        borderRadius: 3,
        mt: { xs: 2, md: 0 },
      }}>
        <ReuseableCard isLoading={isLoading} skeletonWidth={"100%"} sx={{ width: '100%', minWidth:"400px", borderRadius: 3 }}>
          <Typography sx={{ fontWeight: 600, fontSize: "21px" }}>
            Search Data & Counts
          </Typography>
          {filteredBooks && filteredBooks.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#1947DB', fontWeight: 500, mb: 2 }}>
                Search Results: {filteredBooks.length} books found
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1947DB', mb: 1 }}>
                Authors in Search Results:
              </Typography>
              <Box sx={{ overflowY: 'auto', maxHeight: '200px' }}>
                {filteredAuthorList.map(([author, count]) => (
                  <Box key={author} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 0.5,
                    px: 1,
                    borderBottom: '1px solid #f0f0f0',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}>
                    <Typography variant="body1">{author}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {count} {count === 1 ? 'book' : 'books'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">No search results.</Typography>
          )}
        </ReuseableCard>
      </Box>
    </Container>
  )
}

export default HomePage;