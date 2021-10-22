---
author: Dorian
title: Handling forms in Hugo
date: 2021-10-18
authorEmail: mail@dorian.im
---

A while ago, I migrated the [website of Itsblue](https://itsblue.de) from [Grav](https://getgrav.org/) to [Hugo](https://gohugo.io/). The main reason for doing so was that I wanted clean version control, local testing and a static site. But this came with a problem: In Grav, I could use their built-in form engine to process my contact form. In Hugo on the other hand, as there is no backend, processing forms is not as straight forward, Hugo just creates static HTML files.  
So I tried out two existing projects which aim to solve this problem: 

#### hugo-mx-gateway
The project [hugo-mx-gateway](https://github.com/rchakode/hugo-mx-gateway) was made by someone like me, who needed some backend for Hugo to handle form requests. Looked good at first glance, but I stumbled upon some problems:

- There is only a limited number of fields, which cannot be extended ([see here](https://github.com/rchakode/hugo-mx-gateway/blob/73a3eb02669dce7e5edec7bd4ef76c4d8c51aad7/sendmail.go#L215))
- It can only submit forms via SMTP
- It uses the mail address submitted in the form as the sender address, which makes it impossible to send emails which are accepted by modern mail servers ([see here](https://github.com/rchakode/hugo-mx-gateway/issues/6))

To sum it up: This projects looks nice at first glance, but is far too unflexible to be useful in a real-world scenario. And because of the sender address problem, I couldn't use it at all.

#### formspree.io
[formspree.io](https://formspree.io) was the next thing I tried. It has a free plan and is simple and straight forward to use. It even comes with some examples, so you can be up and running quickly. Unfortunately, it also comes with some drawbacks:

- It can only submit forms via SMTP
- It gets kind of expensive if you want to receive more than 50 forms a month. ([see here](https://formspree.io/plans))
- It is not open source, and you cannot self-host it.

Because of this, I decided not to stick to formspree.io. If you have less form submissions than 50 per month or can afford to pay them, formspree.io might be the way to go for you, though.

#### The solution - Formrecevr
After a lot of frustration, I decided to write my own tool to tackle this problem. I wanted to do something with golang for a while and this seemed like the perfect opportunity anyway.  
After a bit of brainstorming, I came up with this simple concept:

- Forms are received via POST requests
- Their data is being fed into a Go template
- The executed template is sent to one or more custom endpoints using [shoutrrr](https://containrrr.dev/shoutrrr)

This approach is very flexible in terms of form fields and endpoints. As of now I'm very satisfied with it and I invite you to try it out yourself: 

### [github.com/dorianim/formrecevr](https://github.com/dorianim/formrecevr)