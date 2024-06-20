import { Box, Button, IconButton, Typography, TextField } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import PropTypes from 'prop-types';
import { useState } from 'react';
import TextTruncate from 'react-text-truncate';
import {toast} from 'react-toastify'

const HomeView = ({ getPurgeCss }) => {
  const [files, setFiles] = useState([]);
  const [css, setCss] = useState('');

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleFileDownload = () => {

    const fileName = prompt('Name your file: ')

    // disrupt operation if user picks "cancel" option

    if (fileName === null) {
      return;
    }

    const blob = new Blob([css], { type: 'text/css' });

    const file = URL.createObjectURL(blob)

    const a = document.createElement('a')

    a.download = `${fileName}.css`

    a.href = file

    a.click()
  }

  const handleGetCssFile = async () => {
    const CSS = await getPurgeCss(files);
    setCss(CSS.toString());
    setFiles([]); // Clear the files array
    document.getElementById('files').value = ''; // Clear the input value
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(css);
    toast('Copied CSS code to clipboard. Enjoy :)', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const handleCancelMenu = () => {
    setCss('');
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom marginTop={10}>
        CSS Optimizer
      </Typography>
      <TextField
        id="files"
        type="file"
        multiple
        inputProps={{ multiple: true }} 
        onChange={handleFileChange}
        sx={{ display: 'block', marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleGetCssFile}>
        Upload
      </Button>

      {css && (
        <Box sx={{ marginTop: 4 }}>
          <IconButton onClick={handleCopyCss} variant="outlined">
            <FileCopyIcon />
          </IconButton>
          <IconButton onClick={handleCancelMenu} variant="outlined" sx={{ marginLeft: 2 }}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={handleFileDownload} variant="outlined" sx={{ marginLeft: 2 }}>
            <DownloadIcon />
          </IconButton>

          <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
            Preview response:
          </Typography>
          <Box sx={{ maxHeight: 200, overflowY: 'scroll', marginTop: 1 }}>
            <TextTruncate line={4} element="pre" truncateText="…" text={css} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

HomeView.propTypes = {
  getPurgeCss: PropTypes.func.isRequired,
};

export default HomeView;