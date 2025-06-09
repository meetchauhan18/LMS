import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';

const ResuseableModal = ({ open, onClose, title, booksData, maxWidth, children, actions, ...props }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth} {...props}>
      <DialogTitle>
        {title}
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
        {children}
      </DialogContent>
      {actions && <DialogActions>
        {actions} </DialogActions>}
    </Dialog>
  )
}

export default ResuseableModal
