export const getPurgeCss = async (files) => {

    const formData = new FormData();
    
    // since there are multiple files, we need to append so we can add each file into the formdata
    files.forEach((file) => {
      formData.append('files', file);
    });
  
    try {
      const response = await fetch(`https://css-tool-4luw-qdeyw0lur-hemit99123s-projects.vercel.app/`, {
        method: 'POST',
        body: formData,
      });
  
      const cssContent = await response.text();

      return cssContent;
    } catch (error) {
      console.error('Error uploading files:', error);
    }
};