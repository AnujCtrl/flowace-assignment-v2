from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget, QPushButton, QLabel, QTableWidget, QTableWidgetItem
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
import sqlite3
import time

class BrowserLogger(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Browser Logger')
        self.setGeometry(200, 200, 600, 400)

        self.url_label = QLabel('No URL logged.')
        self.log_button = QPushButton('Log URL', self)
        self.log_button.clicked.connect(self.log_url)

        self.table = QTableWidget()
        self.table.setColumnCount(3)
        self.table.setHorizontalHeaderLabels(['ID', 'URL', 'Browser'])
        self.refresh_table()

        layout = QVBoxLayout()
        layout.addWidget(self.url_label)
        layout.addWidget(self.log_button)
        layout.addWidget(self.table)

        central_widget = QWidget()
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

        self.driver = None

    def log_url(self):
        if not self.driver:
            self.url_label.setText('Please start the browser first.')
            return

        url = self.driver.current_url

        # Check if the URL already exists in the database
        conn = sqlite3.connect('browser_logs.db')
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM urls WHERE url = ?", (url,))
        count = cursor.fetchone()[0]
        if count == 0:  # URL is not a duplicate
            cursor.execute("INSERT INTO urls (url, browser) VALUES (?, ?)", (url, self.driver.name))
            conn.commit()
            self.url_label.setText('URL logged: ' + url)
        else:
            self.url_label.setText('URL is a duplicate: ' + url)
        conn.close()

        self.refresh_table()

    def start_browser(self, browser):
        if browser == 'Chrome':
            options = ChromeOptions()
            options.add_argument('--headless')  # Run browser in headless mode
            self.driver = webdriver.Chrome(options=options)
        elif browser == 'Firefox':
            options = FirefoxOptions()
            options.headless = False  # Run browser in headless mode
            self.driver = webdriver.Firefox(options=options)
            
    def refresh_table(self):
        conn = sqlite3.connect('browser_logs.db')
        cursor = conn.cursor()
        cursor.execute("SELECT DISTINCT * FROM urls ORDER BY id DESC")
        data = cursor.fetchall()
        conn.close()

        self.table.setRowCount(len(data))
        for row, record in enumerate(data):
            for col, value in enumerate(record):
                self.table.setItem(row, col, QTableWidgetItem(str(value)))

    def closeEvent(self, event):
        if self.driver:
            self.driver.quit()

        event.accept()

if __name__ == '__main__':
    app = QApplication([])
    window = BrowserLogger()
    window.show()

    # Start the browser
    window.start_browser('Firefox')

    app.exec_()
