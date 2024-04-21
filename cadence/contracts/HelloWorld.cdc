pub contract HelloWorld {

  pub var greeting: [String]

  access(all) fun changeGreeting(newGreeting: String) {
    self.greeting.append(newGreeting)
  }
  
  access(all) fun getGreetings(): [String] {
    return self.greeting
  }

  init() {
    self.greeting = []
  }
}
