1. Basics of CSS Animations
CSS animations are defined using two primary properties:

@keyframes: Defines the animation's behavior by specifying the intermediate steps.
animation: A shorthand property to apply the animation to an element.


2. Key Properties of CSS Animations
animation-name: Specifies the name of the animation (linked to @keyframes).
animation-duration: Defines how long the animation lasts (e.g., 2s, 500ms).
animation-timing-function: Controls the pace of the animation (e.g., ease, linear).
animation-delay: Adds a delay before the animation starts.
animation-iteration-count: Specifies how many times the animation runs (infinite for continuous animation).
animation-direction: Controls the direction of the animation (normal, reverse, alternate).
animation-fill-mode: Specifies how styles are applied before/after the animation (none, forwards, backwards, both).



3. Creating Your First Animation
Here’s a simple example of an animation that moves a box from left to right.

HTML:


CSS:

/* Keyframes define the animation */
@keyframes slide {
  0% {
    transform: translateX(0);
    background-color: red;
  }
  50% {
    transform: translateX(150px);
    background-color: yellow;
  }
  100% {
    transform: translateX(0);
    background-color: red;
  }
}

/* Applying animation to an element */
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  animation: slide 2s ease-in-out infinite;
}


4. Understanding the Example
@keyframes slide: Defines how the box moves and changes color during the animation.
At 0%, the box is at its initial position.
At 50%, the box moves 150px to the right and turns yellow.
At 100%, it returns to the starting position.
animation: slide 2s ease-in-out infinite;
slide: The name of the animation.
2s: Duration of the animation.
ease-in-out: Smooth transition in and out.
infinite: The animation repeats forever.



5. Homework for Lecture 1
Experiment with different animation-duration values (e.g., 1s, 5s).
Change the animation-timing-function to linear, ease-in, or ease-out and observe the difference.
Try adding an animation-delay to see how it affects the animation.