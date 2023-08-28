import { Dialog } from 'primereact/dialog'
import React from 'react'
import QRCode from 'react-qr-code'

const QrDialog = ({ visible, onHide }) => {
  return (
    <Dialog visible={visible} onHide={onHide} header='QR PARA PARTICIPAR' modal>
      <>
        <QRCode
          size={300}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={'https://eventos.smartie.com.co/participar'}
          viewBox={`0 0 256 256`}
        />
      </>
    </Dialog>
  )
}

export default QrDialog
