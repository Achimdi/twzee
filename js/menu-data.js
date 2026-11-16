/* TWZEE FOODS: EDIT THE MENU, PRICES AND CONTACT DETAILS HERE.
   PRODUCTS (inside MENU):
   - id: short unique name (letters and dashes). Used by SLIDES and FEATURED below.
   - n: product name. d: description. ing: ingredients (optional). unit: e.g. "per bottle" (optional).
   - img: list of photo names from assets/web (without -600.jpg). The first one is shown on the menu card. No img = a coloured name card.
   - p: price in naira, OR sizes:[{l:"label",p:price,img:"photo for that size (optional)"}].
   - extras: optional add-ons the customer can tick, e.g. [{n:"Extra chicken",p:500}].
   - opt: one required choice with no price change, e.g. ["Chicken","Beef"].
   - ask: a pre-written chat message. The product then shows "Ask us" instead of "Add" (any price p is still displayed).
   - p:null with no ask: the product is HIDDEN until you give it a price.
   - note (on a category, not a product): a plain line of information shown under that category's products.
   - tag: small label on the card, e.g. "Signature" or "New". pos: which part of the photo to keep on the card, e.g. "50% 40%".
   NEW PHOTOS: put the photo in assets/images, then ask your developer to make the web copies in assets/web.
   Web copies use safe names: spaces and symbols become _ and & becomes _and_ ("Chicken & Chips.png" -> "Chicken_and_Chips"). */
var TWZEE_DATA=14; /* version stamp used by the setup check in index.html; leave as is */
/* PHOTOS_V: raise this number by 1 whenever the photos in assets/web are replaced, so browsers load the new pictures instead of old saved copies. */
var PHOTOS_V=3;

/* DELIVERY: flat fee within town for orders placed on the website. Free once the items total reaches freeOver. Set fee:0 to switch delivery fees off. */
const DELIVERY={fee:1500,freeOver:25000};

/* OFFICIAL CHANNELS. wa: WhatsApp number, digits only with country code (orders are sent here). waShow: how the number is written on the page.
   Also update the number in index.html (JSON-LD block near the top). */
const SITE={wa:"2349132155228",waShow:"+234 913 215 5228",ig:"https://www.instagram.com/twzee_foods/",igHandle:"@twzee_foods"};

/* INFO: business details. Anything left as "" is simply not shown.
   town: delivery area. hours: opening hours as written in the footer. lead: ordering notice, e.g. "Trays need 48 hours' notice".
   phone: a number for calls (optional). address: pickup address (optional).
   open: drives the live "Open now / Closed" badge and the weekly hours card (Nigerian time). days = open days; from and to = 24-hour clock (18 = 6pm). */
const INFO={town:"Enugu",hours:"Mon to Sat, 8am to 6pm",lead:"",phone:"",address:"",
 open:{days:"Mon,Tue,Wed,Thu,Fri,Sat",from:8,to:18}};

/* SLIDES: the promotional banners at the top of the page. img = photo name, go = the product id it opens. */
const SLIDES=[{img:"parfait",go:"parfait"},{img:"shawarma",go:"shawarma"},{img:"CARROT",go:"carrot-glow"},{img:"avocado_salad",go:"avocado-salad"},{img:"PINE",go:"fresh-pine"},{img:"STRAWBERRY",go:"strawberry-yoghurt"}];

/* FEATURED: product ids shown in the "Signatures" row. */
const FEATURED=["parfait","shawarma","grilled-chicken-salad","fresh-pine","intimate-pack","food-tray"];

const MENU=[
{id:"parfait",title:"Parfait",blurb:"Layers of sweetened Greek yoghurt, crunchy granola, nuts and fresh fruit.",icon:"parfait_big",items:[
 {id:"parfait",n:"Greek Yoghurt Parfait",tag:"Signature",img:["parfait","parfait_big","parfait_2"],d:"Greek yoghurt parfait, sweetened, topped with granola, nuts and fruit.",
  sizes:[{l:"400ml",p:4000},{l:"550ml",p:5000},{l:"600ml",p:5500},{l:"1 litre",p:9500}]}]},
{id:"yoghurt",title:"Greek Yoghurt",blurb:"Thick, creamy plain Greek yoghurt, sweetened. From a single tub to a family size.",icon:"Greek_Yoghurt_Freshness_500ML",items:[
 {id:"greek-yoghurt",n:"Plain Greek Yoghurt",img:["Greek_Yoghurt_Freshness_500ML","2LITRE","5LITRE"],d:"Plain Greek yoghurt, sweetened. Enjoy it on its own, with granola or in smoothies.",
  sizes:[{l:"500ml",p:5000,img:"Greek_Yoghurt_Freshness_500ML"},{l:"2 litres",p:18500,img:"2LITRE"},{l:"5 litres",p:40000,img:"5LITRE"}]}]},
{id:"granola",title:"Granola",blurb:"Our own ROC Granola: honey, nuts, coconut and oats.",icon:"HERO_PAGE",items:[
 {id:"roc-granola",n:"ROC Granola",img:["HERO_PAGE"],pos:"78% 55%",d:"A fine mix of honey, almonds, cashew nuts, coconut flakes, raisins, oats, nutmeg and canola oil.",
  sizes:[{l:"200g",p:3300},{l:"400g",p:6000}]}]},
{id:"shawarma",title:"Shawarma & Bites",blurb:"Freshly wrapped shawarma, sandwiches and chicken and chips.",icon:"shawarma",items:[
 {id:"shawarma",n:"Shawarma",tag:"Signature",img:["shawarma"],d:"Pick your combo, then add extra chicken or beef if you like.",join:": ",
  sizes:[{l:"Chicken + Sausage",p:4000},{l:"Beef + Sausage",p:4500},{l:"Chicken + Sausage + Cheese",p:5000},{l:"Beef + Sausage + Cheese",p:5500}],
  extras:[{n:"Extra chicken",p:500},{n:"Extra beef",p:500}]},
 {id:"club-sandwich",n:"Club Sandwich",p:1500,img:["CLUB_SANDWICH"],d:"A freshly packed club sandwich."},
 {id:"chicken-and-chips",n:"Chicken and Chips",p:4300,img:["Chicken_and_Chips"],d:"Fried chicken with chips and a sauce pot."}]},
{id:"drinks",title:"Drinks",blurb:"Fresh juices, zobo and yoghurt drinks, all in bottles.",icon:"CARROT",items:[
 {id:"fresh-pine",n:"Fresh Pine",p:3500,unit:"per bottle",ing:"pineapple, ginger",img:["PINE"]},
 {id:"bee-tru",n:"Bee-Tru",p:3500,unit:"per bottle",ing:"beetroot, watermelon, pineapple, ginger",img:["BEETRU"]},
 {id:"carrot-glow",n:"Carrot Glow",p:4000,unit:"per bottle",ing:"carrot, pineapple, turmeric",img:["CARROT"]},
 {id:"citrus-bliss",n:"Citrus Bliss",p:3500,unit:"per bottle",ing:"orange, lemon",img:["CITRUS"]},
 {id:"apple-blast",n:"Apple Blast",p:3500,unit:"per bottle",ing:"pineapple, green apple, red apple, ginger",img:["APPLE"]},
 {id:"bfb",n:"BFB Belly Fat Burner",p:3500,unit:"per bottle",ing:"celery stalk, parsley, kale, mint, turmeric",img:["BURNER"]},
 {id:"zobo",n:"Zobo",p:1000,unit:"per bottle",d:"Chilled hibiscus drink."},
 {id:"milky-yoghurt",n:"Milky Yoghurt",p:3000,unit:"500ml bottle",d:"Sweetened plain yoghurt drink.",img:["MILKY"]},
 {id:"strawberry-yoghurt",n:"Strawberry Yoghurt",p:3500,unit:"500ml bottle",d:"Strawberry yoghurt drink.",img:["STRAWBERRY"]}]},
{id:"salads",title:"Salads",blurb:"Colourful, generous salad bowls, made fresh.",icon:"chicken_salad",items:[
 {id:"grilled-chicken-salad",n:"Grilled Chicken Salad",tag:"Signature",p:7000,img:["chicken_salad"],d:"Grilled chicken on shredded cabbage and carrot, with bow-tie pasta, cucumber, tomato and grapes."},
 {id:"egg-and-spicy-chicken-salad",n:"Egg and Spicy Chicken Salad",p:5000,img:["egg_and_spicey_chicken"],d:"Spicy chicken and boiled egg with grapes, tomato, cucumber, sweetcorn, carrot, bow-tie pasta and sesame seeds."},
 {id:"avocado-salad",n:"Avocado Salad",p:4500,img:["avocado_salad"],d:"Avocado, cucumber and tomato with bow-tie pasta, carrot, grapes and sesame seeds."},
 {id:"avocado-and-spicy-chicken-salad",n:"Avocado and Spicy Chicken Salad",p:5000,img:["avocado_and_chicken_"],d:"Spicy chicken with avocado, tomato, cucumber, lettuce and grapes on shredded cabbage and carrot."}]},
{id:"chops",title:"Small Chops",blurb:"Samosa, spring rolls, puff puff and chicken or beef, packed for you.",icon:"INTIMATE_PACK",
 note:"Single pieces: chicken ₦1,000 to ₦1,500 each, beef ₦500 each. Minimum order of 10 pieces of your choice.",items:[
 {id:"intimate-pack",n:"Intimate Pack",p:13000,opt:["Chicken","Beef"],img:["INTIMATE_PACK"],d:"10 samosa, 10 spring rolls, 30 puff puff and 10 chicken or beef."},
 {id:"me-to-you-pack",n:"Me To You Pack",p:21000,opt:["Chicken","Beef"],img:["ME_TO_YOU_PACK"],d:"15 samosa, 15 spring rolls, 50 puff puff and 10 chicken or beef."},
 {id:"events-pack",n:"Events Pack",img:["ONLY_FOR_EVENT_"],d:"For events only: 1 samosa, 1 spring roll, 4 puff puff and 1 chicken per pack.",btn:"Get a quote",
  ask:"Hello Twzee Foods! I'd like event pricing for the events pack (1 samosa, 1 spring roll, 4 puff puff, 1 chicken). Please tell me the price and the minimum order."}]},
{id:"trays",title:"Food Trays",blurb:"Party and gift trays, packed the way you want.",icon:"FOOD_TRAY",items:[
 {id:"food-tray",n:"Custom Food Tray",p:60000,img:["FOOD_TRAY"],pos:"50% 45%",d:"Small chops, rice, pasta, waffles and chicken, packed the way you want. After adding it, tell us what you'd like on it in the order notes.",
  ask2:"Hello Twzee Foods! I have a question about the ₦60,000 food tray:\n"}]}
];
