# Browser Logger

Browser Logger is a native application compatible with Ubuntu that logs the URLs open in the browser (Chrome/Firefox) and stores them in a local SQLite database.

## Features

- Logs the URLs visited in the browser
- Stores the logged URLs in a local SQLite database
- Provides a user interface to view the logged URLs in a table
- Allows manual logging of the current URL
- Removes duplicate URLs from the database

## Prerequisites

- Ubuntu operating system
- Python 3.x
- Selenium library
- PyQt5 library
- Chrome WebDriver or GeckoDriver (depending on the chosen browser)

## Installation

1. Clone or download the repository.

2. Install the required dependencies:

   ```shell
   pip install selenium PyQt5
   ```

3. Download and install the appropriate WebDriver for your chosen browser:

   - Chrome WebDriver: [ChromeDriver Downloads](https://sites.google.com/a/chromium.org/chromedriver/downloads)
   - GeckoDriver for Firefox: [GeckoDriver Downloads](https://github.com/mozilla/geckodriver/releases)

   Make sure to download the WebDriver version compatible with your browser version and place the executable in a directory accessible by the application.

4. Run the application:

   ```shell
   python3 browser_logger.py
   ```

   The application window will appear, and you can start using it to log and view the URLs.

## Usage

1. Start the application.

2. Choose the browser from the available options (Chrome/Firefox) using the dropdown menu.

3. Click the "Start Browser" button to start the selected browser. The browser will run in head mode.

4. To manually log the current URL, click the "Log URL" button.

5. The table displays the logged URLs with the following columns: ID, URL, and Browser. The table is updated automatically whenever a new URL is logged using the button.

6. To clear the logged URLs and reset the database, refer to the "Clearing the Database" section.

7. Close the application window to exit. The browser will be closed automatically.

## Clearing the Database

To clear the database and remove all the logged URLs, you can follow these steps:

1. Open a terminal.

2. Navigate to the project directory.

3. Run the following command:

   ```shell
   python3 clear_database.py
   ```

   This will delete all the records from the database, and the table will be empty.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.
