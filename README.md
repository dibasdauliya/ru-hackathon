# WeFitWell - Fitness App with Personalized Avatar Companion

Demo link: https://ru-hackathon-six.vercel.app/

Devpost: https://devpost.com/software/wefit-nc6k1r

## Inspiration

Fitness apps today are soulless robotic taskmasters, barking orders at cowed users. Our vision bucks that heartless paradigm - infusing workouts with authentic connection. A digital companion nurtures users with personalized feedback, thriving alongside their journey to wellness.

## What it does

The app gathers user details like fitness goals, age, weight, height, and gender through onboarding questionnaires. It then provides a personalized main dashboard to schedule fitness activities. As users log their completed activities, the app's avatar responds with emoji reactions that evolve based on the user's decisions and progress over time.

## How we built it

We initiated the development process by designing a high-fidelity prototype using Figma, allowing us to iterate on the user experience and interface. We then established the foundation with a basic React frontend.

For the core application, we leveraged JavaScript as the primary programming language along with the React library to build a robust and reactive user interface. TailwindCSS was employed to create a modern, responsive design system adhering to best practices.

User authentication and authorization were seamlessly integrated using the Auth0 platform, ensuring secure access and data protection. The frontend communicates with a backend API, facilitating data exchange and persistence.

The backend was developed using a suitable server-side technology stack, which may include Node.js, Express.js, and a database solution like MongoDB or PostgreSQL, depending on the specific requirements.

Throughout the process, we followed an agile development methodology, incorporating feedback from user testing and continuously enhancing the app's features and performance.

## Challenges we ran into

Developing a dynamically interactive response system with dynamic emoji updates based on user actions proved technically complex. For example, if prompted to drink water but not completing the task, updating the Avatar's emoji state to reflect disappointment required intricate real-time programming.

Additionally, creating an accurate task recommendation engine from user inputs was challenging. Parsing natural language, categorizing goals and needs, and proposing tailored recommendations necessitated extensive research into robust natural language processing and classification models.

## Accomplishments that we're proud of

We successfully developed a dynamic and responsive avatar system that adjusts emotional states through emojis based on user actions in real-time. Despite the technical complexity, our avatars now display nuanced reactions tailored to each user's behavior.

Additionally, our task recommendation engine leverages advanced natural language processing to accurately categorize user inputs and provide personalized suggestions. Extensive research allowed us to implement robust classification models, surfacing highly relevant tasks and activities for each individual.

## What we learned

This project provided a comprehensive learning experience across technical, human, and psychological domains. We mastered real-time interactive systems, emotion modeling, natural language processing, and robust recommendation engines from a technical standpoint. However, we also gained invaluable insights into user-centric design principles, empathetic human-computer interaction, and the psychological underpinnings of motivation, goal-setting, and behavior change.

## What's next for WeFitWell

Implementing a 3d character creator engine so people have an active role in creating their avatars. A more accurate recommendation engine tailored to individual user preferences and patterns.
