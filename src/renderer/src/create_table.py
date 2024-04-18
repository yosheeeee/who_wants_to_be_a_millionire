import sqlite3
import io

# Создаем соединение с базой данных SQLite
conn = sqlite3.connect('questions.db')
c = conn.cursor()

# Создаем таблицу questions
# c.execute('''
#     CREATE TABLE questions (
#         question_id INTEGER PRIMARY KEY AUTOINCREMENT,
#         question_text TEXT,
#         question_answer_1 TEXT,
#         question_answer_2 TEXT,
#         question_answer_3 TEXT,
#         question_answer_4 TEXT,
#         right_answer INTEGER,
#         question_level INTEGER
#     )
# ''')

# Открываем файл questions.txt и считываем данные
with open('questions.txt', 'r', encoding='utf-8-sig') as f:
    for line in f:
         # Разделяем строку на части
              parts = line.strip().split('\t')
              # Добавляем данные в таблицу
              c.execute('''
                  INSERT INTO questions (question_text, question_answer_1, question_answer_2, question_answer_3, question_answer_4, right_answer, question_level)
                  VALUES (?, ?, ?, ?, ?, ?, ?)
              ''', parts)

# Сохраняем изменения и закрываем соединение
conn.commit()
conn.close()
