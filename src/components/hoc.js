function inheritHOC(WrappedComponent) {
  return class Component extends WrappedComponent {
    // ...
    render() {
      return super.render();
    }
  };
}

export default inheritHOC;
