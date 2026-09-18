# Wedding Website

A simple static wedding website with Home, Our Story, Travel, Registry,
FAQ, Save the Date, and RSVP pages. RSVP submissions are collected with
**Netlify Forms** — no backend or database needed.

## 1. Customize the content

Everything in `[square brackets]` is a placeholder. Search each `.html`
file and replace:

- **Names** — "Partner One" / "Partner Two" / "P & P" (site title, in every page's header/footer)
- **Date** — "June 26, 2027" (appears on most pages)
- **Venue** — name and location (`index.html`)
- **Dress code and parking** — `faq.html`
- **Hotels, airport, transportation** — `travel.html`
- **Our Story content** — `our-story.html`
- **FAQ answers** — `faq.html`

### Countdown timer

Open [js/main.js](js/main.js) and update this line near the top with your
actual wedding date and time:

```js
var WEDDING_DATE = '2027-06-26T15:00:00';
```

### Photos

Drop images into the `images/` folder and reference them with
`<img src="images/your-photo.jpg" alt="...">`. A nice spot to add a hero
photo is the `.hero` section in `index.html`.

## 2. Preview locally

Since this is a plain static site, you can just open `index.html` in a
browser. For the best experience (so relative links behave exactly like
they will online), serve it locally instead:

```bash
npx serve .
```

Then visit the URL it prints (usually `http://localhost:3000`).

## 3. Deploy to Netlify

1. Create a free account at [netlify.com](https://netlify.com).
2. Drag the entire `Wedding Website` folder onto the **"Deploy manually"**
   area on your Netlify dashboard — or connect it to a GitHub repo for
   auto-deploys on every push.
3. Netlify automatically detects the RSVP form (`rsvp.html`) because of
   the `data-netlify="true"` attribute — no extra config needed.
4. Once deployed, submit a test RSVP yourself to confirm it works.

## 4. View RSVP submissions

In your Netlify dashboard: **Site settings → Forms**. Every RSVP appears
there, and you can export them as CSV. To get an email notification for
each new RSVP: **Forms → Settings and usage → Add notification → Email
notification**.

### Spam protection

The form includes a honeypot field (`bot-field`) that's invisible to real
visitors. Bots that auto-fill it will have their submissions silently
discarded by Netlify — you don't need to do anything extra.

## File structure

```
index.html          Home page with hero + countdown
our-story.html       How you met / got engaged
travel.html          Hotels, airport, getting around
registry.html        Registry links
faq.html              Frequently asked questions
rsvp.html             RSVP form (Netlify Forms)
rsvp-success.html     Thank-you page shown after RSVP submission
css/style.css         All styling
js/main.js            Countdown timer, mobile nav, RSVP form behavior
images/                Put your photos here
netlify.toml           Netlify deploy config
```
