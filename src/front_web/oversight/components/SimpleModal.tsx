import React, { Fragment, JSXElementConstructor, ReactElement } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { IconButton, Slide, Theme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'

type SimpleModalProps = {
  open: boolean
  title: string
  close: () => void
  children: React.ReactNode
  minWidth?: string | number
  fullScreen?: boolean
  forceIndex?: boolean
  defaultBgColor?: boolean
  TransitionComponent?: JSXElementConstructor<TransitionProps & { children: ReactElement<any, any> }>
}

const SimpleModal = ({
  open,
  title,
  close,
  children,
  minWidth,
  fullScreen,
  defaultBgColor,
  forceIndex,
  TransitionComponent
}: SimpleModalProps) => {
  return (
    <Fragment>
      <Dialog
        sx={(theme: Theme) => ({
          zIndex: forceIndex ? '2000 !important' : theme.zIndex.modal,
          '& .MuiDialog-container': {
            '& .MuiDialog-paper': {
              backgroundColor: defaultBgColor ? theme.palette.background.default : '',
              width: '100%',
              minWidth: minWidth || '1000',
              position: 'relative' // Set your width here
            }
          }
        })}
        TransitionComponent={TransitionComponent}
        open={open}
        onClose={close}
        fullScreen={fullScreen}
      >
        {!!close ? (
          <IconButton onClick={close} sx={{ position: 'absolute', right: 10, top: 10 }}>
            <CloseIcon />
          </IconButton>
        ) : null}
        <DialogTitle variant='h5' fontWeight={800}>
          {title}
        </DialogTitle>
        <DialogContent>
          {/* <Divider sx={{m:0, mb: 3}} /> */}
          {children}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default SimpleModal
