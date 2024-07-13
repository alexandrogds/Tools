import os
import sys
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class MyHandler(FileSystemEventHandler):
    def on_modified(self, event):
        print(f'Arquivo modificado: {event.src_path}')
        os.system('taskkill /f /im python.exe')  # Finaliza todos os processos Python
        os.system('python app.py')  # Reinicia o servidor Flask

if __name__ == "__main__":
    event_handler = MyHandler()
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=True)  # Monitora o diretório atual recursivamente
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
