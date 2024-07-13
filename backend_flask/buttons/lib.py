import os

def get_database_path():
    # script_dir = os.path.dirname(__file__)
    current_dir = os.getcwd()

    # if os.path.basename(current_dir) != 'backend_flask':
    #     return os.path.join('backend_flask', 'buttons', 'buttons.db')
    # else:
    #     return os.path.join('buttons.db')
    
    return os.path.join('buttons.db')
