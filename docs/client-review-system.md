# Client Review System

## System Identity
The final evaluation of a freelancer's delivery. This system ensures that the player's choices during a project have a visible and emotional impact through client feedback.

## Design Philosophy
- Emotional Closure: Every project ends with a formal review, providing a sense of completion.
- Metric-Driven Feedback: Reviews are not random; they depend on project conditions, speed (time remaining), and final delivery status.
- Star Rating (1-5): A visual summary of client satisfaction.

## Rating Logic

### Success States
- Perfect (5 Stars): Delivered with no major negative conditions (Technical Debt, Scope Creep) and plenty of time left.
- Good (4 Stars): Delivered successfully, but with some minor conditions or slightly rushed.
- Crunchy (3 Stars): Delivered with multiple negative conditions or at the very last moment (less than 5 hours remaining).

### Failure States
- Standard Failure (1 Star): Project failed to deliver. Results in severe reputation loss and financial penalty.

## UI Visualization
The ClientReviewModal.jsx displays:
- The client's professional identity (Company Name).
- The star rating.
- A randomized, localized feedback message based on the performance tier.
- A final summary of the reward/penalty and reputation change.

## Immersion and Pacing
The system automatically pauses the game upon delivery, forcing the player to read the feedback. This creates a moment of reflection before moving on to the next contract.
