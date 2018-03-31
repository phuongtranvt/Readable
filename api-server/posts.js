const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'The Future of Technology in the Automotive Industry',
    body: `1) More Fuel-Efficient Rides
    Tesla is at the forefront of the fuel-efficiency movement, releasing a slew of electric and hybrid vehicles that can take you for hundreds of miles with a single charge. In 2016, more than 2 million electric vehicles were sold worldwide and this figure is expected to rise in the near future as more automotive manufacturers implement electric vehicle technology to their fold. Companies such as VW and General Motors have recently unveiled electric cars to their fleet, while Volvo said that all of the engines they produce will be equipped with an electric motor by 2019.

    2) Predictive Vehicle Technology
    Predictive vehicle technology can also be used in the form of sensors within a car that informs the owner whether or not the vehicle needs service from a mechanic. Depending on your car’s mileage and condition, the technology will be able to estimate its performance, set up appointments in real time and inform users of any safety hazards linked with a malfunctioning car due to company recalls.

    3) Self-Driving Technology
    Google recently revealed the self-driving pod Waymo, while Local Motors released a fully-autonomous vehicle as well. Ford hopes to have a self-driving vehicle on the roads by 2021.

    4) Cars-as-a-Service (CaaS)
    IHS Automotive predicts that driverless CaaS are on the horizon, expected to roll out before 2025. Such a technology could help to reduce mobility services costs, while also offering a safer alternative to a human driver.

    The bottom line…

    Some of the greatest minds in the tech industry have joined forces with automotive companies in order to improve the way our vehicles operate these days. The rise of electric vehicle technology is helping to reduce carbon emissions without breaking the bank as more companies are designing cars with electric motors.

    Big data and AI are playing an essential role in the customization of vehicles as well, notifying car owners of when their vehicles need maintenance. Plus, the rise of self-driving vehicles and the potential of CaaS as a mobility service will save consumers greatly, while also increasing their safety.`,
    author: 'thingtwo',
    category: 'technology',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'You’re not changing the world',
    body: `I mean, in the widest possible sense, you are. Your mere existence is bound to change some of it somewhat. But that’s not what the unironic use of the phrase — WE ARE CHANGING THE WORLD — is meant to convey in Silicon Valley. They’re actually serious.

And look, some of them do end up changing the world. The world is different now that, say, Twitter is here, and the president of the United States can threaten nuclear war from the comfort of his golden shitcan. Seriously, that is different!

But let’s just say that most companies that actually end up changing the world rarely set out with that as the explicit mission. Twitter started as a way of telling your drinking buddies by SMS which dive bar you were hanging out at. Facebook started as a way for Zuckerberg to lure “dumb fucks” into giving him their private information. Modest beginnings!

The odds are that whatever you’re doing is never going to amount to any of the global significance that either Twitter or Facebook has bestowed upon the world. And thank god for that! If everyone in Silicon Valley who proclaimed to be on a mission to change the world actually did, our collective regret would be far deeper.

So ponder this example from HealthIQ’s career page from yesterday (since changed*):


I like to peek beneath the surface of such delusions of grandeur. What on earth would prompt someone hawking life insurance — LIFE INSURANCE! — to posture, and quite possibly believe, that they’re Changing The World™ (or, as here, Healing The World)? Such delusions seem farcical on their face. An Onion piece a little too on the nose. But there we are.`,
    author: 'thingone',
    category: 'culture',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
