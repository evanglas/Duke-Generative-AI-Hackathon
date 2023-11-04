# Duke-Generative-AI-Hackathon

This is a Chrome Extension that translates webpage text to different reading levels and different languages.

## Team Members

Evan Glas (ejg38)
Luxin Zhang (lz211)
Junhan Xu (jx139)

## Motivation

Much of the internet is inaccessible to individuals without advanced reading skills.
Expand the accessibility of websites on the internet
The Internet can be an inaccessible place for young students
Literacy skills are highly variable across the world.
Poorer countries may have lower literacy rates, adults may struggle to engage with most written language on the internet.
Mainstream media may also use dialects/formalisms unfamiliar to those from diverse backgrounds
Provide a tool to help individuals learn a language by translating texts to another language at a comfortable reading level
For instance, could convert the New York Times to Spanish, but at the reading level of an elementary school student.
(Maybe) Convert dense, formal language into more casual text to make reading more enjoyable and faster.

## Planned Deliverable

Google Chrome Extension

1. UI
   Provide the ability to select a reading level
   Provide the ability to select language
   (Maybe) Provide the ability to make the text more casual/less formal. (E.g., maybe to reduce the amount of technical jargon in a scientific paper or make a legal document clearer to an everyday reader or translate some ancient quotes to modern understandable words)
2. Functions
   Scrape the text off of a website
   Translate the text to the desired format using ChatGPT API

## Project Breakdown

1.  UI
    - Window users can open in Chrome
    - Ability to select a desired reading level
    - Ability to select the desired language
    - Pretty visual aesthetic
    - Extension clickable icon on the webpage
2.  Logic

    - Ability to scrape desired text off of a website
      - Paragraphs
      - Headers
      - Titles
    - Ability to take parameters from the UI

      - Desired reading level
      - Language

    - Ability to send text to OpenAI API along with desired parameters
    - Ability to replace the text on the website with the corresponding reformatted text
      OpenAI API
    - Ability to work with ChatGPT API to get desired output for each combination of parameters
      May need to “engineer” a set of prompts that work

## Implementation

1. Selection:
   Language Preference
   Reading Level
