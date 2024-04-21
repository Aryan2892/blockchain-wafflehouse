pub contract HelloWorld {

  pub var greeting: [String]

  access(all) fun changeGreeting(newGreeting: String) {
    self.greeting.append(newGreeting)
  }
  
  access(all) fun getLastXGreetings(numGreetings: Int): [String] {
    if numGreetings >= self.greeting.length {
      return self.greeting
    } else {
      let startIndex = self.greeting.length - numGreetings
      return self.greeting.slice(from: startIndex, upTo: self.greeting.length)
    }
  }

  init() {
    self.greeting = ["Hello, World!"]
  }
}
