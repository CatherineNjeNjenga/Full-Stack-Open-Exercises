props is an object
Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.
The component's state or a piece of its state can be of any type
the state of React components, like allClicks, must not be mutated directly
Before the addition of hooks, there was no way to add state to functional components. Components that required state had to be defined as class components, using the JavaScript class syntax.
Dev tools show the state of hooks in the order of their definition
The useState function (as well as the useEffect function introduced later on in the course) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component.
Functions returning functions can be utilized in defining generic functionality that can be customized with parameters.
functional operators