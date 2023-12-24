# pdf-editor


# Install dependencies
npm install

# Run the development server
npm run dev

## Completed features

1- Project UI & Layout
2- Importing & displaying a PDF file using react-pdf-viewer library
3- OnClick "Text" button we can add an text field input and field name only once and with fixed x,y coordinates using pdf-lib library
4- OnClick "Image" button we can add an image only once and with fixed x,y coordinates using pdf-lib library
5- We can export updated PDF file onClick "Export" button

## Remaining issues

1- We can execute only one operation on an imported PDF file (Text / Image) + same problem if we want to add another Text field or embedded Image.

=> If we do both we got: Error creating form field: Error: Failed to parse PDF document (line:0 col:0 offset=0): No PDF header found at MissingPDFHeaderError2.PDFParsingError2 [as constructor] (errors.ts:163:5)

2- Drawing / creating text fields or Images with dynamic x,y coordinates not done.