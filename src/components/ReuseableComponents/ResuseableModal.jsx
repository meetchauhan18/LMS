import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Skeleton } from '@mui/material'
import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';

const ResuseableModal = ({ open, onClose, title, booksData, maxWidth, children, isLoading, actions, ...props }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth} {...props}>
      <DialogTitle>
        {isLoading ?  <Skeleton variant="rectangular" width={50} height={24} /> : title}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <IoCloseCircleOutline />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        {isLoading ? <Skeleton variant="rectangular" width={100} height={36} /> : children}
      </DialogContent>
      {actions && <DialogActions>
        {isLoading ? <Skeleton variant='text' width={"40%"} height={20} /> : actions} </DialogActions>}
    </Dialog>
  )
}

export default ResuseableModal
