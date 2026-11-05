/* TWZEE FOODS: EDIT MENU HERE. (tint = the pale background colour for that category or drink; circ:1 shows an ellipse-shaped photo as a circle) p = price in naira. Change names, prices and descriptions freely.
   Each item is in one of three states:
   - priced: has a number p -> shows "Add to order"
   - ask: has an "ask" message -> shows an Ask on WhatsApp button (a price p, if set, is still displayed)
   - hidden: p:null and no "ask" -> NOT shown on the page until you add a price
   WHATSAPP NUMBER: change SITE.wa (digits only, with country code). INSTAGRAM: change SITE.ig.
   Also update the same number and link in index.html (footer fallback links and the JSON-LD block). */
var TWZEE_DATA=4; /* version stamp used by the setup check in index.html; leave as is */
const SITE={wa:"2349132155228",ig:"https://www.instagram.com/twzee_foods/"};
const MENU={
parfait:{title:"Parfait",tint:"#FCE6EA",desc:"Greek yoghurt parfait, sweetened, topped with granola, nuts and fruit.",
 sizes:[{l:"400ml",ml:400,p:4000},{l:"550ml",ml:550,p:5000},{l:"600ml",ml:600,p:5500},{l:"1 litre",ml:1000,p:9500}],
 photos:[["parfait_big.jpeg","Tubs of Twzee Foods parfait layered with yoghurt, granola, nuts and fruit","50% 60%"],["parfait_2.jpeg","Parfait cups topped with granola, almonds, cashews and grapes, seen from above","50% 45%"],["parfait.jpeg","Greek yoghurt parfait cups topped with granola, cashews, almonds, grapes and blueberries","50% 55%"]]},
yoghurt:{title:"Greek Yoghurt",tint:"#F5F1E4",desc:"Plain Greek yoghurt, sweetened.",sq:1,
 sizes:[{l:"500ml",ml:500,p:5000},{l:"2 litres",ml:2000,p:18500},{l:"5 litres",ml:5000,p:40000}],
 photos:[["500ML.jpeg","A 500ml tub of plain Greek yoghurt, sweetened, on green leaves","50% 55%"],["2LITRE.jpeg","A 2 litre tub of Twzee Foods Greek yoghurt","50% 55%"],["5LITRE.jpeg","Two large Twzee Foods tubs of Greek yoghurt stacked on a table","50% 50%"]]},
granola:{title:"Granola",tint:"#FBEFD2",desc:"ROC Granola. A fine mix of honey, almonds, cashew nuts, coconut flakes, raisins, oats, nutmeg and canola oil.",
 sizes:[{l:"200g",p:3300},{l:"400g",p:6000}]},
shawarma:{title:"Shawarma & Bites",tint:"#F8DFD0",desc:"Pick your combo, then add extra chicken or beef if you like.",
 extras:[{n:"Extra chicken",p:500},{n:"Extra beef",p:500}],
 items:[{n:"Chicken + Sausage",p:4000},{n:"Beef + Sausage",p:4500},{n:"Chicken + Sausage + Cheese",p:5000},{n:"Beef + Sausage + Cheese",p:5500}],
 bites:[{n:"Club Sandwich",p:1500,f:"CLUB_SANDWICH.jpeg",pos:"50% 50%",a:"Two packed club sandwiches on green leaves"},
        {n:"Chicken and Chips",p:4300,f:"CHICKEN.jpeg",pos:"50% 55%",a:"Foil trays of chips with fried chicken and a sauce pot"}]},
drinks:{title:"Drinks",tint:"#FDEBD0",desc:"Fresh juices, zobo and yoghurt drinks, all in bottles.",
 juices:[
 {n:"Fresh Pine",t:"#FCEFA8",p:3500,u:"per bottle",ing:"pineapple, ginger",f:"PINE.jpeg",pos:"50% 55%",a:"Two bottles of Fresh Pine juice beside a pineapple"},
 {n:"Bee-Tru",t:"#F7D3E3",p:3500,u:"per bottle",ing:"beetroot, watermelon, pineapple, ginger",f:"BEETRU.jpeg",pos:"30% 50%",a:"A bottle of Bee-Tru juice beside a beetroot"},
 {n:"Carrot Glow",t:"#FDDDB8",p:4000,u:"per bottle",ing:"carrot, pineapple, turmeric",f:"CARROT.jpeg",pos:"45% 55%",a:"A bottle of Carrot Glow juice beside a carrot"},
 {n:"Citrus Bliss",t:"#F4F6B4",p:3500,u:"per bottle",ing:"orange, lemon",f:"CITRUS.jpeg",pos:"50% 55%",a:"A bottle of Citrus Bliss juice between citrus fruits"},
 {n:"Apple Blast",t:"#DDF0CF",p:3500,u:"per bottle",ing:"pineapple, green apple, red apple, ginger",f:"APPLE.jpeg",pos:"50% 50%",a:"Bottles of Apple Blast juice"},
 /* HIDDEN: BFB Belly Fat Burner. ADD A PRICE HERE (e.g. p:3500) and it will appear on the page. */
 {n:"BFB Belly Fat Burner",t:"#D9EBCB",p:null,u:"per bottle",ing:"celery stalk, parsley, kale, mint, turmeric",f:"BURNER.jpeg",pos:"50% 55%",a:"A bottle of BFB Belly Fat Burner juice"},
 {n:"Zobo",p:1000,u:"per bottle",cls:"zobo"}],
 yog:[{n:"Milky Yoghurt 500ml",t:"#F3EEE3",p:3000,f:"MILKY.jpeg",pos:"50% 45%",a:"A hand holding a bottle of sweetened plain yoghurt"},
      {n:"Strawberry Yoghurt 500ml",t:"#FBD9E1",p:3500,f:"STRAWBERRY.jpeg",pos:"50% 45%",a:"A hand holding a bottle of Strawberry Yoghurt"}]},
salads:{title:"Salads",tint:"#E3F0E0",desc:"Colourful salad bowls.",items:[
 {n:"Grilled Chicken Salad",p:7000,f:"chicken_salad.jpeg",pos:"40% 68%",d:"Grilled chicken on shredded cabbage and carrot, with bow-tie pasta, cucumber, tomato and grapes.",a:"Trays of salad with grilled chicken, bow-tie pasta, cucumber, tomato and grapes"},
 {n:"Egg and Spicy Chicken Salad",p:5000,f:"egg_and_spicey_chicken.jpeg",pos:"50% 45%",fix:1,d:"Spicy chicken and boiled egg with grapes, tomato, cucumber, sweetcorn, carrot, bow-tie pasta and sesame seeds.",a:"Salad bowl with spicy chicken, boiled egg, grapes, tomato, cucumber, sweetcorn and bow-tie pasta"},
 {n:"Avocado Salad",p:4500,f:"avocado_salad.jpeg",pos:"50% 40%",d:"Avocado, cucumber and tomato with bow-tie pasta, carrot, grapes and sesame seeds.",a:"Three domed Twzee Foods salad bowls with avocado, cucumber, tomato and bow-tie pasta, beside a lemon and a strawberry"},
 {n:"Avocado and Spicy Chicken Salad",p:5000,circ:1,f:"avocado_and_chicken_1_.jpeg",pos:"50% 45%",d:"Spicy chicken with avocado, tomato, cucumber, lettuce and grapes on shredded cabbage and carrot.",a:"Salad box with spicy chicken, avocado, tomato, cucumber and lettuce"}]},
chops:{title:"Small Chops",tint:"#F5E6D3",desc:"Choose a pack, or order single pieces.",
 packs:[{n:"Intimate Pack",p:13000,d:"10 samosa, 10 spring rolls, 30 puff puff, 10 chicken or beef. Tell us chicken or beef on WhatsApp.",f:"INTIMATE_PACK.jpeg",pos:"50% 50%",a:"A Twzee Foods box of spring rolls, samosa and puff puff on green leaves"},
        {n:"Me To You Pack",p:21000,d:"15 samosa, 15 spring rolls, 50 puff puff, 10 chicken or beef. Tell us chicken or beef on WhatsApp.",f:"ME_TO_YOU_PACK.jpeg",pos:"50% 40%",a:"Stacked Twzee Foods boxes packed with puff puff"},
        {n:"Events Pack",d:"For events only: 1 samosa, 1 spring roll, 4 puff puff, 1 chicken.",f:"ONLY_FOR_EVENT_.jpeg",pos:"50% 50%",a:"Rows of foil trays with puff puff, samosa, spring roll and a sauce pot",btn:"Ask on WhatsApp for event pricing",ask:"Hello Twzee Foods! I'd like event pricing for the events pack (1 samosa, 1 spring roll, 4 puff puff, 1 chicken). Please tell me the price and the minimum order."}],
 single:"Single pieces: chicken ₦1,000 to ₦1,500 each, beef ₦500 each. Minimum order of 10 pieces of your choice.",
 singleAsk:"Hello Twzee Foods! I'd like to order small chops by the piece (minimum 10 pieces). Please tell me what is available."},
trays:{title:"Food Trays",tint:"#F3E1DC",desc:"Custom trays built around what you want. Tell us what to put in it and we'll customise it for you.",n:"Food Tray",p:60000,btn:"Customise on WhatsApp",ask:"Hello Twzee Foods! I'd like to order the ₦60,000 food tray. This is what I'd like in it:\n"}
};
