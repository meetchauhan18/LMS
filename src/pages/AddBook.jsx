import { Box, Button, Container, FormControl, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { localstoragecrudapi } from '../api/localstoragecrudapi.js';


const AddBook = () => {
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();
  const [isAdding, SetIsAdding] = useState(false);
  const [form, setForm] = useState({
    book: '',
    author: '',
    id: uuidv4()
  });
  const [error, setError] = useState({
    message: '',
    error: false
  });

  useEffect(() => {
    try {
      const booksData = localstoragecrudapi.getBooks('libraryAppData');
      setAllBooks(booksData ? JSON.parse(booksData) : []);
    } catch {
      setAllBooks([]);
    }
  }, []);

  //Form Value Checking
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setError({ message: '', error: false }); // Clear error on change
  }

  // Form Handling
  const handleSubmit = (e) => {
    e.preventDefault();
    SetIsAdding(true);

    if (!form.book) {
      setError({ message: 'Book Name is required', error: true });
      SetIsAdding(false);
      return;
    }
    if (!form.author) {
      setError({ message: 'Author Name is required', error: true });
      SetIsAdding(false);
      return;
    }

    try {
      // Add new book to state and localStorage
      const newBook = { ...form, id: uuidv4() };
      const newAllBooksData = [...allBooks, newBook];
      setAllBooks(newAllBooksData);
      localstoragecrudapi.setBook('libraryAppData', JSON.stringify(newAllBooksData));
      setForm({ book: '', author: '', id: uuidv4() });
      setError({ message: '', error: false });
      toast.success('Book added successfully!');
    } catch (err) {
      toast.error('Error Adding Book');
      console.error(err);
    } finally {
      SetIsAdding(false);
      setTimeout(() => navigate('/'), 1000);
    }
  }
  return (
    <Container sx={{
      minWidth: '100%',
      padding: '16px',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <Box>
        <Typography variant="h5" sx={{ marginBottom: '16px', color: '#333' }}>Add Book</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <FormControl sx={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              variant='outlined'
              value={form.book}
              onChange={handleChange}
              name="book"
              label="Book Name"
              sx={{ width: '350px' }}
            />
            <TextField
              variant='outlined'
              value={form.author}
              onChange={handleChange}
              name="author"
              label="Author Name"
              sx={{ marginTop: '16px' }}
            />
            {error.error && <Typography color="error">{error.message}</Typography>}
            <Button type='submit' variant='contained' color='primary' disabled={isAdding || error.error} sx={{ width: '100%' }}>
              {isAdding ? 'Adding...' : 'Add new book'}
            </Button>
          </FormControl>
        </form>
      </Box>
    </Container>
  )
}

export default AddBook;
