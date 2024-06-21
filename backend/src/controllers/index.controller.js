import postcss from 'postcss';
import purgecss from '@fullhuman/postcss-purgecss';

export const handlePostReq = async (req, res) => {
  try {
    res.send('Web Ready CSS Tool API')
    
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Internal Server Error');
  }
};

export const handleGetReq = async (req, res) => {
  try {
    // Logging the files received
    console.log('Files received:', req.files);

    // Initialize arrays to store HTML and CSS files
    let htmlFiles = [];
    let cssFiles = [];

    // Iterate over the files and filter them
    req.files.forEach((file) => {
      if (file.mimetype === 'text/html') {
        htmlFiles.push(file);
      } else if (file.mimetype === 'text/css') {
        cssFiles.push(file); // Push to array, not assign directly so many css files can be uploaded too (optionally of course!)
      }
    });

    // Check if at least one HTML file and one CSS file are present
    if (htmlFiles.length === 0 || cssFiles.length === 0) {
      console.log('Invalid file upload');
      return res.status(400).send('Invalid file upload. Both HTML and CSS files are required.');
    }

    // Convert buffers to strings
    const htmlContents = htmlFiles.map(file => file.buffer.toString('utf8'));
    const cssContents = cssFiles.map(file => file.buffer.toString('utf8'));

    // Combine all HTML and CSS contents into a single string for PurgeCSS processing
    const combinedHtmlContent = htmlContents.join(' ');
    const combinedCSSContent = cssContents.join(' ');
    
    // Processing CSS with PurgeCSS
    const purgeCssResult = await postcss([
      purgecss({
        content: [{ raw: combinedHtmlContent, extension: 'html' }],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      })
    ]).process(combinedCSSContent, { from: undefined });

    // Sending the processed CSS as a response
    res.send(purgeCssResult.css)
    
  } catch (error) {
    console.error('Error processing files:', error);
    res.status(500).send('Internal Server Error');
  }
};
