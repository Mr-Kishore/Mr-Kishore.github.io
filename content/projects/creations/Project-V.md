---
title: "Voice Assisted Student Data Management"
date: 2018-02-11T12:41:05-05:00
type: "creations"
image: "/img/pfp.jpg"
github: "https://github.com/Mr-Kishore/Project_V"
description: "A simple ML based program used to access, modify and delete data in a database either using keyboard commands or using Push-to-talk feature"
tags: ["Python Programming","User Application", "File Handling", "Machine Learning", "Advanced Python Concepts", "Real-world Application"]
featured: true
---

## Overview
A **Student Detail Management System** is a Python-based console application that simplifies managing student, staff, academic, and transport records through **voice commands**. It utilizes **speech recognition** and **text-to-speech (TTS)** to minimize manual input, making it an intuitive and user-friendly system.

## Features
- Voice-activated menu navigation
- Student, staff, academic, and transport record management
- Fuzzy string matching for improved voice command recognition
- Automatic fallback to text input when speech recognition fails
- Persistent data storage using CSV files

## Dependencies
Ensure you have the required libraries installed:
```sh
pip install speechrecognition pyttsx3 fuzzywuzzy keyboard
```

## Code Structure
The system is modular and categorized into different functional sections:

### Core Functions
- `speak(text)`: Converts text to speech.
- `recognize_speech()`: Captures voice input and converts it into text.
- `match_command(command, options)`: Matches spoken commands to predefined options using fuzzy string matching.

### Main Menu
- `def_main_menu()`: Displays the main menu and handles voice navigation.

### Student Management
- `def_student_menu()`: Handles student-related operations.
- `def_add_student()`: Adds a student record.
- `def_view_students()`: Displays all students.
- `def_remove_student()`: Deletes a student record.
- `def_search_student()`: Searches for a student by roll number.
- `def_update_student()`: Updates student details.

### Staff Management
- `def_staff_detail()`: Manages staff details.
- `def_add_student_s()`: Adds staff records.
- `def_view_students_s()`: Displays all staff members.
- `def_remove_student_s()`: Deletes a staff record.
- `def_search_student_s()`: Searches for a staff member.
- `def_update_student_s()`: Updates staff records.

### Academic Management
- `def_academic_list()`: Handles academic data.
- `def_add_student_a()`: Adds academic details.
- `def_view_students_a()`: Displays academic records.
- `def_remove_student_a()`: Deletes an academic record.
- `def_search_student_a()`: Searches academic details.
- `def_update_student_a()`: Updates academic records.

### Transport Management
- `def_transport_detail()`: Manages transport records.
- `def_add_student_t()`: Adds transport details.
- `def_view_students_t()`: Displays transport records.
- `def_remove_student_t()`: Deletes a transport record.
- `def_search_student_t()`: Searches transport details.
- `def_update_student_t()`: Updates transport records.

## Usage
1. **Run the script**: Launch the program to begin interaction.
2. **Use voice commands**: Speak the option number or name for navigation.
3. **Fallback to text**: If speech recognition fails, you can type commands.
4. **Exit anytime**: Say or type `exit` to close the application.

## Notes
- The program listens for voice input **only after the SPACEBAR is pressed**.
- All records are stored in **CSV files** for persistence.
- **Fuzzy string matching** enhances command recognition.           

## Conclusion
This **voice-controlled student management system** eliminates tedious manual input, making data handling effortless. The combination of **speech recognition and text-to-speech** improves accessibility. Future upgrades could include a GUI and database integration for enhanced performance and scalability.


> Both versions are well-commented to aid your understanding. If you have any questions or need further clarification, feel free to create an issue in either repository, and I will be happy to assist you.