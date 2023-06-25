import sqlite3


conn = sqlite3.connect('browser_logs.db')
cursor = conn.cursor()
cursor.execute("DELETE FROM urls")
conn.commit()
conn.close()
