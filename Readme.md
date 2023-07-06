# Electron Browser

Electron Browser is a simple web browser application built using Electron framework. It allows you to browse websites, perform searches, refresh the page, and navigate back.

## Getting Started

To get started with Electron Browser, follow these steps:

### Prerequisites

- Node.js and npm

### Installation

1. Clone the repository:


2. Navigate to the project directory:

   ```

   cd electron-browser

   ```

3. Install the dependencies:

   ```

   npm install

   ```

### Usage

1. Start the Electron application:

   ```

   npm start

   ```

2. The Electron Browser window will open with a toolbar containing a search bar, refresh button, and back button.

3. Enter a URL in the search bar and press Enter or click the Go button to navigate to the website.

4. Use the refresh button to reload the current page.

5. Use the back button to navigate back to the previous page.

### Customization

- You can modify the default URL by changing the `src` attribute of the `webview` element in the `renderer.js` file.

- Adjust the styling of the browser window and toolbar by modifying the CSS styles in the `index.html` file.

### Built With

- Electron - Framework for building cross-platform desktop applications using JavaScript, HTML, and CSS.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- [Electron](https://www.electronjs.org/) - The Electron framework used in this project.
- [SQLite](https://www.sqlite.org/) - SQLite database used for storing logs.

### Author

Your Name - [GitHub](https://github.com/AnujCtrl)