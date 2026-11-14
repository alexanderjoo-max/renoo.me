// Procedure Content Database
// Contains detailed information for all 30 medical tourism procedures on Renoo.me
// This file must be loaded BEFORE procedure.js

const PROCEDURE_CONTENT = {
  "Botox": {
    heroValues: [
      { icon: "⏱️", text: "15-30 min treatment" },
      { icon: "🎯", text: "Results in 3-7 days" },
      { icon: "✨", text: "Lasts 3-4 months" }
    ],
    whatIsIt: {
      definition: "Botox is a purified protein derived from botulinum toxin that temporarily relaxes facial muscles to reduce the appearance of wrinkles and fine lines.",
      purpose: "The primary purpose is to smooth dynamic wrinkles caused by repetitive facial expressions, creating a more youthful and refreshed appearance.",
      howItWorks: "Small amounts of botulinum toxin are injected into specific facial muscles, blocking nerve signals that cause muscle contractions and allowing the overlying skin to appear smoother."
    },
    whyChoose: {
      goals: ["Reduce forehead lines and crow's feet", "Soften frown lines between eyebrows", "Achieve a more youthful appearance", "Prevent new wrinkles from forming"],
      useCases: ["Dynamic facial wrinkles", "Preventative anti-aging treatment", "Excessive sweating (hyperhidrosis)", "Migraine headache management"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "A medical professional assesses your facial anatomy, discusses your aesthetic goals, and determines appropriate injection sites and dosage." },
        { title: "Preparation", desc: "The treatment area is cleansed and may be numbed with ice or topical anesthetic, though most patients tolerate the brief injections without numbing." },
        { title: "Treatment", desc: "Using a fine needle, precise amounts of Botox are injected into targeted facial muscles over the course of 15-30 minutes." },
        { title: "Recovery", desc: "You can resume normal activities immediately, though you should avoid lying down, rubbing the treated area, or intense exercise for 4-6 hours." }
      ],
      duration: "15-30 minutes",
      setting: "Medical clinic or cosmetic surgery center",
      anesthesia: "None or topical anesthetic"
    },
    benefits: {
      physical: ["Smooths wrinkles and fine lines", "Creates a refreshed, youthful appearance", "Reduces excessive sweating when used for hyperhidrosis"],
      mental: ["Boosts self-confidence", "Reduces self-consciousness about aging", "Provides satisfaction with facial appearance"],
      longTerm: ["May prevent new wrinkles from forming with regular use", "Non-surgical alternative to facelift", "Minimal downtime allows quick return to activities"],
      evidenceLevel: "High — extensively studied with proven efficacy and safety profile"
    },
    whoIsItFor: {
      goodCandidates: ["Adults 18-65 with dynamic facial wrinkles", "Those seeking non-surgical wrinkle reduction", "People with realistic expectations", "Individuals in good general health"],
      notSuitableFor: ["Pregnant or breastfeeding women", "People with neuromuscular disorders", "Those allergic to botulinum toxin", "Individuals with active skin infections at injection sites"],
      screeningRequired: "Medical history review to identify contraindications and ensure appropriate candidacy for treatment."
    },
    results: {
      immediate: "Minimal visible change immediately after injection, with possible mild redness or swelling at injection sites.",
      shortTerm: "Results begin to appear within 3-7 days as the muscles gradually relax and wrinkles soften.",
      mediumTerm: "Peak results are visible at 2 weeks, with smooth, natural-looking wrinkle reduction that maintains for 3-4 months.",
      longTerm: "Effects gradually wear off as nerve signals resume, requiring repeat treatments every 3-4 months to maintain results.",
      typicalPlan: "Most patients schedule maintenance treatments 3-4 times per year to sustain their desired appearance."
    },
    safety: {
      commonEffects: ["Temporary bruising or swelling at injection sites", "Mild headache", "Temporary drooping of eyelid or eyebrow if injected improperly"],
      rareRisks: ["Allergic reaction", "Muscle weakness beyond treated area", "Vision problems or difficulty swallowing"],
      protocols: ["Treatment by qualified medical professionals only", "Proper dosing and injection technique", "Post-treatment monitoring and follow-up care"]
    },
    faq: [
      { q: "Does Botox hurt?", a: "Most patients describe a slight pinching sensation during injection, but the discomfort is minimal and brief." },
      { q: "Will I look frozen or unnatural?", a: "When properly administered, Botox creates natural-looking results that soften wrinkles while maintaining facial expression." },
      { q: "How long before I see results?", a: "Most people notice initial effects within 3-5 days, with full results visible at 2 weeks." },
      { q: "Can Botox be reversed?", a: "While there is no immediate reversal, the effects naturally wear off completely within 3-6 months as muscle function returns." },
      { q: "Is Botox safe for long-term use?", a: "Decades of research and clinical use have established Botox as safe for repeated treatments when administered by qualified professionals." }
    ]
  },

  "Facelift": {
    heroValues: [
      { icon: "⏱️", text: "2-5 hour surgery" },
      { icon: "🎯", text: "Results last 10+ years" },
      { icon: "✨", text: "2-4 weeks recovery" }
    ],
    whatIsIt: {
      definition: "A facelift, or rhytidectomy, is a surgical procedure that tightens and repositions facial tissues to reduce sagging and create a more youthful facial contour.",
      purpose: "The procedure addresses age-related changes including jowls, deep creases, loose neck skin, and loss of definition in the jawline and cheeks.",
      howItWorks: "Incisions are made around the hairline and ears, allowing the surgeon to lift and reposition underlying tissues, remove excess skin, and redrape the remaining skin for a smoother, firmer appearance."
    },
    whyChoose: {
      goals: ["Eliminate sagging jowls and loose neck skin", "Restore youthful facial contours", "Reduce deep facial creases and folds", "Achieve long-lasting rejuvenation"],
      useCases: ["Moderate to severe facial aging", "Loss of jawline definition", "Deep nasolabial folds and marionette lines", "Excess skin and fat in the neck"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "The surgeon evaluates your facial structure, discusses your goals, reviews medical history, and explains the specific facelift technique recommended for your needs." },
        { title: "Preparation", desc: "Pre-operative instructions include avoiding certain medications, arranging transportation and post-operative care, and undergoing any required medical clearances." },
        { title: "Treatment", desc: "Under general anesthesia or sedation, incisions are made, underlying tissues are lifted and tightened, excess skin is removed, and incisions are closed with sutures." },
        { title: "Recovery", desc: "Initial recovery involves swelling and bruising for 2-3 weeks, with gradual return to normal activities and final results visible after several months as tissues settle." }
      ],
      duration: "2-5 hours depending on extent",
      setting: "Hospital or accredited surgical center",
      anesthesia: "General anesthesia or IV sedation"
    },
    benefits: {
      physical: ["Dramatically reduces visible signs of aging", "Restores youthful facial contours and definition", "Tightens loose skin on face and neck"],
      mental: ["Significantly boosts self-confidence", "Improves satisfaction with appearance", "Reduces anxiety about aging"],
      longTerm: ["Results typically last 10-15 years", "More cost-effective than repeated non-surgical treatments", "Can be combined with other procedures for comprehensive rejuvenation"],
      evidenceLevel: "High — well-established surgical technique with extensive safety and efficacy data"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with moderate to severe facial sagging", "Those in good overall health", "Non-smokers or willing to quit before surgery", "People with realistic expectations about outcomes"],
      notSuitableFor: ["Those with serious medical conditions affecting healing", "Active smokers unwilling to quit", "People with unrealistic expectations", "Those unable to take time off for recovery"],
      screeningRequired: "Comprehensive medical evaluation including blood work, cardiovascular assessment if indicated, and psychological readiness for surgery."
    },
    results: {
      immediate: "Face is bandaged with visible swelling and bruising, though improved contours are noticeable even beneath post-operative changes.",
      shortTerm: "Significant swelling and bruising subside over 2-3 weeks, with most patients comfortable in public by week 3-4.",
      mediumTerm: "Residual swelling resolves over 3-6 months, with final results becoming apparent as tissues settle into their new position.",
      longTerm: "Results typically last 10-15 years, though natural aging continues and some patients opt for secondary procedures later.",
      typicalPlan: "One major surgery with potential for minor touch-ups or complementary procedures like eyelid surgery or fat grafting."
    },
    safety: {
      commonEffects: ["Swelling and bruising for 2-4 weeks", "Temporary numbness in treated areas", "Visible scarring that fades over time"],
      rareRisks: ["Infection", "Hematoma requiring drainage", "Nerve damage causing facial weakness", "Poor wound healing or skin loss"],
      protocols: ["Surgery by board-certified plastic surgeon", "Accredited surgical facility", "Post-operative monitoring and follow-up care", "Compression garments and wound care instructions"]
    },
    faq: [
      { q: "Will I look unnatural or windswept?", a: "Modern facelift techniques create natural results that restore youthful contours without the overly tight or pulled appearance of older methods." },
      { q: "Where are the scars?", a: "Incisions are carefully placed in the hairline and natural creases around the ears where they become nearly invisible once healed." },
      { q: "When can I return to work?", a: "Most patients return to desk work after 2-3 weeks, though more physically demanding jobs may require 4-6 weeks off." },
      { q: "How long do results last?", a: "While results typically last 10-15 years, the aging process continues and lifestyle factors like sun exposure and smoking affect longevity." },
      { q: "Can I combine a facelift with other procedures?", a: "Yes, facelifts are commonly combined with eyelid surgery, brow lift, fat grafting, or laser resurfacing for comprehensive facial rejuvenation." }
    ]
  },

  "Rhinoplasty": {
    heroValues: [
      { icon: "⏱️", text: "1.5-3 hour surgery" },
      { icon: "🎯", text: "Permanent reshaping" },
      { icon: "✨", text: "1-2 weeks recovery" }
    ],
    whatIsIt: {
      definition: "Rhinoplasty, commonly called a nose job, is a surgical procedure that reshapes the nose by modifying bone, cartilage, and soft tissue to improve appearance or function.",
      purpose: "The procedure addresses aesthetic concerns like a dorsal hump, wide bridge, or bulbous tip, as well as functional issues such as breathing difficulties from a deviated septum.",
      howItWorks: "Through incisions inside the nose or across the columella, the surgeon reshapes nasal structures by removing or adding tissue, repositioning cartilage, and refining the nasal contour."
    },
    whyChoose: {
      goals: ["Improve facial harmony and balance", "Correct breathing problems", "Reshape nose size, width, or profile", "Repair damage from injury or birth defects"],
      useCases: ["Dorsal hump or bump on bridge", "Deviated septum causing breathing issues", "Bulbous or drooping nasal tip", "Nasal asymmetry or trauma-related deformity"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "The surgeon analyzes your nasal structure using photographs and imaging, discusses aesthetic and functional goals, and creates a surgical plan tailored to your anatomy." },
        { title: "Preparation", desc: "Pre-operative instructions include avoiding blood-thinning medications, arranging post-operative support, and understanding recovery expectations and potential risks." },
        { title: "Treatment", desc: "Under general anesthesia, incisions are made, nasal bones and cartilage are reshaped through reduction, augmentation, or repositioning, and incisions are closed." },
        { title: "Recovery", desc: "A splint protects the nose for one week, with significant swelling and bruising subsiding in 2-3 weeks and final results emerging over 12 months." }
      ],
      duration: "1.5-3 hours",
      setting: "Hospital or accredited surgical center",
      anesthesia: "General anesthesia"
    },
    benefits: {
      physical: ["Improves facial proportion and harmony", "Corrects breathing difficulties", "Reshapes nose to desired aesthetic"],
      mental: ["Increases self-confidence", "Reduces self-consciousness about appearance", "Improves quality of life through better breathing"],
      longTerm: ["Permanent results that mature over one year", "Potential improvement in sleep quality if breathing was impaired", "Can be revised if needed, though initial surgery aims for permanent correction"],
      evidenceLevel: "High — well-established procedure with extensive outcome data and patient satisfaction"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with fully developed nasal structures (typically 15+)", "Those with realistic aesthetic or functional goals", "Non-smokers in good health", "People with specific, definable nasal concerns"],
      notSuitableFor: ["Teenagers with still-developing facial structure", "Active smokers", "Those with unrealistic expectations", "People with certain bleeding disorders"],
      screeningRequired: "Physical examination of nasal anatomy, medical history review, and discussion of goals to ensure appropriate candidacy and surgical planning."
    },
    results: {
      immediate: "Nose is splinted and bandaged with significant swelling, though new shape is partially visible beneath post-operative changes.",
      shortTerm: "Splint removed at 1 week, with most swelling and bruising resolving by 2-3 weeks allowing return to public activities.",
      mediumTerm: "Subtle swelling continues to resolve over 6-12 months, with the nasal tip being the last area to fully refine.",
      longTerm: "Final results are considered stable at 12 months, with permanent reshaping that continues to look natural as you age.",
      typicalPlan: "One surgery with rare need for minor revision if desired refinements emerge after complete healing."
    },
    safety: {
      commonEffects: ["Swelling and bruising around eyes and nose", "Temporary nasal congestion", "Numbness in nasal skin"],
      rareRisks: ["Infection", "Bleeding or hematoma", "Asymmetry or unsatisfactory aesthetic result", "Breathing difficulty from internal scarring"],
      protocols: ["Surgery by board-certified facial plastic surgeon", "Computer imaging for surgical planning", "Post-operative splinting and monitoring", "Gradual return to normal activities"]
    },
    faq: [
      { q: "How painful is rhinoplasty recovery?", a: "Most patients report discomfort rather than severe pain, easily managed with prescribed medications, though nasal congestion can be bothersome." },
      { q: "Will people know I had surgery?", a: "Bruising and swelling are obvious for 2-3 weeks, but incisions are hidden inside the nose or in inconspicuous locations, leaving no visible external scars." },
      { q: "When will I see my final results?", a: "While major changes are visible after swelling subsides at 3-6 months, subtle refinements continue for up to one year as residual swelling resolves." },
      { q: "Can rhinoplasty fix breathing problems?", a: "Yes, functional rhinoplasty can correct a deviated septum, enlarged turbinates, or structural issues that impair nasal airflow." },
      { q: "What if I don't like the results?", a: "Revision rhinoplasty is possible but should wait 12 months for complete healing, which is why thorough planning and realistic expectations are crucial." }
    ]
  },

  "Hair Transplant": {
    heroValues: [
      { icon: "⏱️", text: "4-8 hour procedure" },
      { icon: "🎯", text: "Results in 6-12 months" },
      { icon: "✨", text: "Permanent restoration" }
    ],
    whatIsIt: {
      definition: "Hair transplantation is a surgical procedure that moves hair follicles from a donor area (usually the back of the scalp) to balding or thinning areas to restore natural hair growth.",
      purpose: "The procedure provides permanent hair restoration for those experiencing pattern baldness, thinning hair, or hair loss from injury or medical conditions.",
      howItWorks: "Individual follicular units or strips of scalp containing hair follicles are harvested from donor areas and precisely implanted into recipient sites, where they establish blood supply and continue growing naturally."
    },
    whyChoose: {
      goals: ["Restore natural-looking hairline", "Increase hair density in thinning areas", "Achieve permanent hair restoration", "Regain confidence and youthful appearance"],
      useCases: ["Male or female pattern baldness", "Receding hairline", "Thinning crown or vertex", "Hair loss from scarring or trauma"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "The surgeon evaluates your hair loss pattern, donor hair availability, scalp condition, and discusses realistic outcomes based on your specific situation." },
        { title: "Preparation", desc: "The donor area is trimmed if necessary, the scalp is cleansed and numbed with local anesthetic, and you are positioned comfortably for the lengthy procedure." },
        { title: "Treatment", desc: "Hair follicles are harvested using FUE (individual extraction) or FUT (strip method), then meticulously implanted into recipient sites at precise angles and densities." },
        { title: "Recovery", desc: "Mild swelling and scabbing occur for 7-10 days, transplanted hairs shed in 2-3 weeks before regrowing permanently starting at 3-4 months." }
      ],
      duration: "4-8 hours depending on graft number",
      setting: "Specialized hair restoration clinic",
      anesthesia: "Local anesthesia with optional sedation"
    },
    benefits: {
      physical: ["Permanent, natural-looking hair growth", "Restores hairline and density", "Hair can be cut, styled, and treated normally"],
      mental: ["Significantly improves self-confidence", "Reduces anxiety about appearance", "Restores more youthful self-image"],
      longTerm: ["Transplanted hair grows for life", "Minimal maintenance beyond normal hair care", "Can be repeated if further restoration desired"],
      evidenceLevel: "High — proven effective with high patient satisfaction and natural-looking outcomes"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with pattern baldness and sufficient donor hair", "Those with realistic expectations", "People in good health", "Individuals with hair loss stabilized or progressing slowly"],
      notSuitableFor: ["Those with insufficient donor hair", "People with certain autoimmune hair loss conditions", "Individuals with unrealistic expectations", "Those with keloid scarring tendency"],
      screeningRequired: "Scalp examination to assess donor hair quality and quantity, medical history review, and discussion of expected outcomes based on hair loss pattern."
    },
    results: {
      immediate: "Transplanted area has tiny scabs and appears reddish, with immediate placement of grafts visible though swelling may obscure the hairline.",
      shortTerm: "Scabbing resolves in 7-10 days and transplanted hairs shed in 2-4 weeks, which is normal and expected before permanent regrowth begins.",
      mediumTerm: "New hair growth starts at 3-4 months, increasing progressively in thickness and density through 6-9 months.",
      longTerm: "Final results are visible at 12-18 months with full density and maturation, representing permanent hair restoration that grows naturally for life.",
      typicalPlan: "One or two sessions depending on the extent of restoration needed, with potential for additional sessions if hair loss progresses."
    },
    safety: {
      commonEffects: ["Swelling of scalp and forehead", "Temporary numbness in treated areas", "Scabbing and crusting at graft sites", "Temporary shedding of transplanted hairs"],
      rareRisks: ["Infection", "Excessive bleeding", "Folliculitis (inflammation of hair follicles)", "Visible scarring in donor or recipient areas"],
      protocols: ["Surgery by experienced hair restoration specialist", "Sterile technique and proper graft handling", "Post-operative antibiotics and care instructions", "Follow-up monitoring of graft survival"]
    },
    faq: [
      { q: "Does hair transplant look natural?", a: "Modern techniques create highly natural results by implanting individual follicles at precise angles and densities that mimic natural hair growth patterns." },
      { q: "Will the transplanted hair fall out?", a: "Transplanted hairs shed in 2-4 weeks, which is normal, but the follicles remain and produce new permanent hair growth starting at 3-4 months." },
      { q: "How many grafts will I need?", a: "This varies widely based on the size of the balding area and desired density, ranging from 1000-4000 grafts or more, determined during consultation." },
      { q: "Is the donor area left bald?", a: "With FUE, tiny individual extraction sites heal invisibly, while FUT leaves a thin linear scar that is easily concealed by surrounding hair." },
      { q: "Can I shave my head after transplant?", a: "Yes, once fully healed, transplanted hair can be cut, shaved, or styled just like your natural hair." }
    ]
  },

  "Dental Veneers": {
    heroValues: [
      { icon: "⏱️", text: "2-3 appointments" },
      { icon: "🎯", text: "Immediate transformation" },
      { icon: "✨", text: "Lasts 10-15 years" }
    ],
    whatIsIt: {
      definition: "Dental veneers are thin, custom-made shells of porcelain or composite resin that are bonded to the front surface of teeth to improve their appearance.",
      purpose: "Veneers correct cosmetic imperfections including discoloration, chips, gaps, misalignment, and uneven or worn teeth to create a beautiful, uniform smile.",
      howItWorks: "A small amount of enamel is removed from the tooth surface, an impression is taken, custom veneers are fabricated in a lab, and then permanently bonded to the prepared teeth."
    },
    whyChoose: {
      goals: ["Achieve a bright, uniform smile", "Correct discolored or stained teeth", "Fix chipped, cracked, or worn teeth", "Close gaps and improve tooth alignment"],
      useCases: ["Severe tooth discoloration resistant to whitening", "Minor chips, cracks, or irregularities", "Gaps between teeth", "Slightly misaligned or uneven teeth"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "The dentist examines your teeth, discusses your smile goals, takes photographs and impressions, and helps you select the appropriate shade and shape." },
        { title: "Preparation", desc: "A small amount of enamel (typically 0.5mm) is removed from the tooth surface, impressions are taken, and temporary veneers may be placed while permanent ones are fabricated." },
        { title: "Treatment", desc: "Permanent veneers are tried in for fit and appearance, the tooth surface is etched and prepared, and veneers are bonded using strong dental adhesive and cured with special light." },
        { title: "Recovery", desc: "There is minimal recovery, though you may experience temporary sensitivity to hot and cold, and a follow-up appointment ensures proper fit and bite." }
      ],
      duration: "2-3 appointments over 2-3 weeks",
      setting: "Dental office or cosmetic dentistry clinic",
      anesthesia: "Local anesthesia for preparation"
    },
    benefits: {
      physical: ["Creates bright, uniform, and aesthetically pleasing smile", "Strengthens tooth structure", "Stain-resistant surface maintains whiteness"],
      mental: ["Dramatically boosts confidence in social and professional settings", "Reduces self-consciousness about smiling", "Improves overall satisfaction with appearance"],
      longTerm: ["Durable results lasting 10-15 years with proper care", "Minimal maintenance beyond normal oral hygiene", "Can be replaced or updated as needed"],
      evidenceLevel: "High — well-established cosmetic dental procedure with excellent longevity and patient satisfaction"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with cosmetic dental concerns", "Those with healthy gums and adequate enamel", "Non-smokers or light smokers", "People committed to good oral hygiene"],
      notSuitableFor: ["Those with severe tooth decay or gum disease", "People who grind their teeth (bruxism) without wearing a night guard", "Those with insufficient enamel", "Individuals with severely misaligned teeth requiring orthodontics"],
      screeningRequired: "Comprehensive dental examination including X-rays to ensure tooth and gum health, and assessment of bite alignment and enamel thickness."
    },
    results: {
      immediate: "Dramatic transformation is visible immediately after veneers are bonded, creating a bright, uniform, and natural-looking smile.",
      shortTerm: "Mild sensitivity to temperature may occur for a few days as teeth adjust to the veneers and bonding material fully sets.",
      mediumTerm: "Teeth feel completely natural within 1-2 weeks, and any initial sensitivity resolves as you adapt to your new smile.",
      longTerm: "With proper care including regular brushing, flossing, and dental checkups, veneers maintain their appearance for 10-15 years or longer.",
      typicalPlan: "Veneers are permanent and typically replaced only if damaged or after 10-15 years when natural wear occurs."
    },
    safety: {
      commonEffects: ["Temporary tooth sensitivity to hot and cold", "Minor gum irritation during adjustment", "Slight changes in bite sensation"],
      rareRisks: ["Veneer debonding or falling off", "Tooth damage if veneers are not properly maintained", "Underlying tooth decay if oral hygiene is poor"],
      protocols: ["Treatment by experienced cosmetic dentist", "Proper tooth preparation and bonding technique", "Custom fabrication for optimal fit", "Regular dental checkups to monitor veneer integrity"]
    },
    faq: [
      { q: "Do veneers damage your teeth?", a: "A small amount of enamel must be removed for veneer placement, making the process irreversible, but when done properly by a skilled dentist, teeth remain healthy." },
      { q: "Can veneers stain?", a: "Porcelain veneers are highly stain-resistant and do not discolor like natural teeth, though composite veneers may stain slightly over time." },
      { q: "How do I care for veneers?", a: "Maintain veneers through normal brushing and flossing, avoid biting extremely hard objects, and wear a night guard if you grind your teeth." },
      { q: "Will veneers look fake?", a: "Modern veneers are custom-designed to match your facial features and desired aesthetic, creating natural-looking results that complement your smile." },
      { q: "Can I whiten teeth with veneers?", a: "Veneers themselves cannot be whitened, so it's important to achieve your desired tooth shade before veneers are made to ensure color matching." }
    ]
  },

  "Breast Augmentation": {
    heroValues: [
      { icon: "⏱️", text: "1-2 hour surgery" },
      { icon: "🎯", text: "Immediate size increase" },
      { icon: "✨", text: "Lasts 10-20 years" }
    ],
    whatIsIt: {
      definition: "Breast augmentation is a surgical procedure that increases breast size and enhances shape using saline or silicone implants, or in some cases, fat transfer.",
      purpose: "The procedure addresses small breast size, asymmetry, loss of volume after pregnancy or weight loss, and helps patients achieve their desired breast proportions.",
      howItWorks: "Through small incisions in inconspicuous locations, implants are placed either under the breast tissue or beneath the chest muscle, creating fuller, more shapely breasts."
    },
    whyChoose: {
      goals: ["Increase breast size and fullness", "Improve breast symmetry", "Restore breast volume after pregnancy or weight loss", "Enhance body confidence and proportions"],
      useCases: ["Naturally small breasts", "Breast asymmetry", "Loss of volume after pregnancy or breastfeeding", "Desire for more proportionate figure"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "The surgeon discusses implant options, sizing, placement, and incision locations while examining breast anatomy and taking measurements to recommend appropriate options." },
        { title: "Preparation", desc: "Pre-operative instructions include medication adjustments, medical clearances if needed, and arranging post-operative care and time off work." },
        { title: "Treatment", desc: "Under general anesthesia, incisions are made, pockets are created for implants either above or below the chest muscle, implants are positioned, and incisions are closed." },
        { title: "Recovery", desc: "Pain and swelling are managed with medication, surgical bras provide support, and most patients return to light activities within 1-2 weeks with full recovery in 6-8 weeks." }
      ],
      duration: "1-2 hours",
      setting: "Hospital or accredited surgical center",
      anesthesia: "General anesthesia"
    },
    benefits: {
      physical: ["Increases breast size and fullness", "Improves breast shape and symmetry", "Enhances body proportions"],
      mental: ["Significantly boosts self-confidence", "Improves body image satisfaction", "Enhances comfort in clothing and swimwear"],
      longTerm: ["Long-lasting results (10-20 years)", "Can be revised or replaced if desired", "Allows for customized size and shape"],
      evidenceLevel: "High — one of the most studied cosmetic procedures with extensive safety data"
    },
    whoIsItFor: {
      goodCandidates: ["Adults 18+ with fully developed breasts", "Those in good overall health", "Non-smokers or willing to quit", "People with realistic expectations"],
      notSuitableFor: ["Those with active breast infections", "Pregnant or breastfeeding women", "People with unrealistic expectations", "Those with certain connective tissue disorders"],
      screeningRequired: "Physical breast examination, mammogram if indicated by age or history, medical history review, and discussion of implant options and placement."
    },
    results: {
      immediate: "Breasts are larger and fuller immediately after surgery, though swelling and positioning make final results not yet apparent.",
      shortTerm: "Swelling subsides over 2-4 weeks, and breasts begin to settle into more natural position and shape.",
      mediumTerm: "Implants drop and soften over 3-6 months, revealing final breast shape, size, and positioning.",
      longTerm: "Results are stable and long-lasting, though implants may eventually need replacement after 10-20 years or if complications arise.",
      typicalPlan: "One surgery with potential for future revision if size change desired or implant issues develop over time."
    },
    safety: {
      commonEffects: ["Pain and soreness for 1-2 weeks", "Swelling and bruising", "Temporary changes in nipple sensation"],
      rareRisks: ["Capsular contracture (scar tissue tightening)", "Implant rupture or leakage", "Infection", "Changes in ability to breastfeed"],
      protocols: ["Surgery by board-certified plastic surgeon", "FDA-approved implants", "Post-operative antibiotics", "Regular monitoring and implant checks"]
    },
    faq: [
      { q: "Will breast implants look natural?", a: "Modern implants and surgical techniques create natural-looking results when properly sized and placed by an experienced surgeon." },
      { q: "Can I breastfeed with implants?", a: "Most women can breastfeed successfully after augmentation, though incision location and surgical technique can affect this ability." },
      { q: "Do implants need to be replaced?", a: "Implants are not lifetime devices and may need replacement after 10-20 years or if complications like rupture occur." },
      { q: "How do I choose the right size?", a: "Your surgeon will help you select appropriate size based on your body frame, existing breast tissue, and aesthetic goals using sizing tools." },
      { q: "Will I lose nipple sensation?", a: "Temporary numbness is common, and while most sensation returns within months, permanent changes can occur in rare cases." }
    ]
  },

  "Brazilian Butt Lift": {
    heroValues: [
      { icon: "⏱️", text: "2-4 hour surgery" },
      { icon: "🎯", text: "Natural fat transfer" },
      { icon: "✨", text: "Permanent results" }
    ],
    whatIsIt: {
      definition: "Brazilian Butt Lift (BBL) is a surgical procedure that enhances buttock size and shape using your own fat harvested from other body areas through liposuction.",
      purpose: "The procedure creates rounder, fuller, more lifted buttocks while simultaneously contouring donor areas like the abdomen, flanks, or thighs.",
      howItWorks: "Fat is removed from donor sites via liposuction, purified, and strategically injected into the buttocks at various depths to create the desired shape and projection."
    },
    whyChoose: {
      goals: ["Increase buttock size and roundness", "Improve buttock shape and contour", "Create more balanced body proportions", "Contour donor areas simultaneously"],
      useCases: ["Flat or sagging buttocks", "Asymmetrical buttocks", "Lack of body curves", "Desire for more proportionate figure"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "The surgeon assesses fat availability in donor areas, discusses desired buttock shape and size, and explains the procedure and realistic outcomes." },
        { title: "Preparation", desc: "Pre-operative instructions include avoiding certain medications, arranging special post-operative cushions for sitting, and planning recovery time off." },
        { title: "Treatment", desc: "Fat is harvested via liposuction from donor sites, processed and purified, then carefully injected into multiple layers of the buttocks to create shape and volume." },
        { title: "Recovery", desc: "Special positioning is required to avoid sitting directly on buttocks for 2-3 weeks, compression garments are worn, and gradual return to activities occurs over 6-8 weeks." }
      ],
      duration: "2-4 hours",
      setting: "Accredited surgical center or hospital",
      anesthesia: "General anesthesia"
    },
    benefits: {
      physical: ["Creates fuller, rounder, more lifted buttocks", "Improves body proportions and curves", "Simultaneously contours donor areas"],
      mental: ["Enhances body confidence", "Improves satisfaction with appearance", "Provides more clothing options"],
      longTerm: ["Permanent results as transferred fat cells survive", "Natural feel since it's your own tissue", "Can be repeated if additional volume desired"],
      evidenceLevel: "High — popular procedure with well-documented outcomes when performed safely"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with sufficient fat for harvest", "Those in good overall health", "Non-smokers", "People with realistic expectations about outcomes"],
      notSuitableFor: ["Very thin individuals without adequate donor fat", "Smokers unwilling to quit", "Those unable to avoid sitting for 2-3 weeks", "People with certain medical conditions affecting healing"],
      screeningRequired: "Physical examination to assess fat availability, medical history review, and discussion of post-operative positioning requirements and recovery expectations."
    },
    results: {
      immediate: "Buttocks appear larger and rounder immediately, though swelling and the fact that not all fat will survive affect final outcome.",
      shortTerm: "Approximately 30-40% of transferred fat is reabsorbed in first 2-3 months as body establishes blood supply to remaining fat cells.",
      mediumTerm: "Swelling resolves over 3-6 months, revealing more accurate final size and shape as surviving fat cells become permanent.",
      longTerm: "Results are permanent for the fat that survives, though weight fluctuations can affect size and natural aging continues.",
      typicalPlan: "One surgery, with potential for revision if additional volume desired or if initial fat survival was lower than hoped."
    },
    safety: {
      commonEffects: ["Swelling and bruising in buttocks and donor areas", "Discomfort when sitting", "Temporary firmness or lumps as fat settles"],
      rareRisks: ["Fat embolism (serious complication from fat entering bloodstream)", "Infection", "Asymmetry or contour irregularities", "Fat necrosis"],
      protocols: ["Surgery by board-certified plastic surgeon experienced in BBL", "Ultrasound-guided injection to avoid deep vessels", "Proper post-operative positioning", "Compression garments and monitoring"]
    },
    faq: [
      { q: "How long until I can sit normally?", a: "Most surgeons recommend avoiding direct pressure on buttocks for 2-3 weeks, using special cushions, and gradually resuming normal sitting after that." },
      { q: "How much of the fat survives?", a: "Typically 60-70% of transferred fat establishes blood supply and survives permanently, with 30-40% being reabsorbed." },
      { q: "Can I exercise after BBL?", a: "Light walking is encouraged immediately, but strenuous exercise and activities should be avoided for 6-8 weeks during initial healing." },
      { q: "Will results look natural?", a: "Since it's your own fat, results look and feel natural, and an experienced surgeon creates proportionate, aesthetically pleasing contours." },
      { q: "What if I don't have enough fat?", a: "Alternatives include buttock implants or multiple staged BBL procedures, though candidates need some donor fat for the procedure to be viable." }
    ]
  },

  "Liposuction": {
    heroValues: [
      { icon: "⏱️", text: "1-4 hour procedure" },
      { icon: "🎯", text: "Removes stubborn fat" },
      { icon: "✨", text: "Permanent contouring" }
    ],
    whatIsIt: {
      definition: "Liposuction is a surgical procedure that removes excess fat deposits from specific body areas using suction through small incisions to improve body contours.",
      purpose: "The procedure targets stubborn fat pockets resistant to diet and exercise, creating more defined, proportionate body contours and shape.",
      howItWorks: "A thin tube called a cannula is inserted through small incisions and moved back and forth to break up fat, which is then suctioned out using a surgical vacuum."
    },
    whyChoose: {
      goals: ["Remove stubborn fat deposits", "Improve body contours and proportions", "Create more defined appearance", "Enhance clothing fit"],
      useCases: ["Resistant fat in abdomen, thighs, or flanks", "Love handles or muffin top", "Double chin or neck fat", "Arm or back fat deposits"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "The surgeon assesses fat distribution, discusses target areas, determines candidacy, and explains realistic outcomes based on your body type." },
        { title: "Preparation", desc: "Pre-operative instructions include medication adjustments, hydration requirements, and arranging compression garments and post-operative support." },
        { title: "Treatment", desc: "After anesthesia, tumescent fluid is injected to minimize bleeding, small incisions are made, and fat is systematically removed using cannulas and suction." },
        { title: "Recovery", desc: "Compression garments are worn for 4-6 weeks, swelling gradually subsides, and most patients return to work within 1-2 weeks with full recovery in 6-8 weeks." }
      ],
      duration: "1-4 hours depending on areas treated",
      setting: "Accredited surgical center or hospital",
      anesthesia: "General anesthesia or local with sedation"
    },
    benefits: {
      physical: ["Removes stubborn fat deposits", "Creates more contoured body shape", "Improves body proportions"],
      mental: ["Boosts confidence in appearance", "Improves satisfaction with body shape", "Enhances clothing options and fit"],
      longTerm: ["Permanent removal of fat cells from treated areas", "Results maintained with stable weight", "Can be combined with other body contouring procedures"],
      evidenceLevel: "High — one of the most performed and studied cosmetic procedures worldwide"
    },
    whoIsItFor: {
      goodCandidates: ["Adults at or near ideal body weight with localized fat", "Those with good skin elasticity", "Non-smokers in good health", "People with realistic expectations"],
      notSuitableFor: ["Those significantly overweight (not a weight-loss solution)", "People with poor skin elasticity", "Those with certain medical conditions", "Individuals expecting dramatic weight loss"],
      screeningRequired: "Physical examination to assess fat distribution and skin quality, medical history review, and discussion of target areas and expected outcomes."
    },
    results: {
      immediate: "Treated areas show reduced volume immediately, though swelling obscures final contours and results are not yet visible.",
      shortTerm: "Significant swelling subsides over 2-4 weeks, revealing improved contours, though residual swelling persists for months.",
      mediumTerm: "Continued improvement over 3-6 months as all swelling resolves and skin contracts to new body contours.",
      longTerm: "Results are permanent as fat cells removed do not regenerate, though remaining fat cells can enlarge with weight gain.",
      typicalPlan: "One procedure, with potential for revision if additional contouring desired in same or different areas."
    },
    safety: {
      commonEffects: ["Swelling and bruising for 2-4 weeks", "Temporary numbness or tingling", "Fluid drainage from incision sites", "Soreness and tightness"],
      rareRisks: ["Contour irregularities or asymmetry", "Infection", "Seroma (fluid accumulation)", "Skin necrosis in severe cases"],
      protocols: ["Surgery by board-certified plastic surgeon", "Proper surgical technique and fat removal limits", "Compression garments", "Post-operative monitoring and lymphatic massage"]
    },
    faq: [
      { q: "Is liposuction a weight-loss procedure?", a: "No, liposuction is a body contouring procedure for removing localized fat deposits, not a weight-loss solution for overweight individuals." },
      { q: "Will fat come back after liposuction?", a: "Fat cells removed are gone permanently, but remaining fat cells can enlarge with weight gain, potentially affecting results." },
      { q: "How much fat can be removed safely?", a: "For safety, most surgeons limit removal to 5 liters or less in a single session, depending on patient size and health." },
      { q: "Will I have loose skin after liposuction?", a: "Patients with good skin elasticity typically see skin contract nicely, but those with poor elasticity may need additional procedures like a tummy tuck." },
      { q: "When can I see final results?", a: "While improvement is visible at 4-6 weeks, final results take 3-6 months as all swelling resolves and skin fully adapts." }
    ]
  },

  "Tummy Tuck": {
    heroValues: [
      { icon: "⏱️", text: "2-5 hour surgery" },
      { icon: "🎯", text: "Removes excess skin" },
      { icon: "✨", text: "Permanent flattening" }
    ],
    whatIsIt: {
      definition: "A tummy tuck, or abdominoplasty, is a surgical procedure that removes excess skin and fat from the abdomen while tightening abdominal muscles to create a flatter, firmer profile.",
      purpose: "The procedure addresses loose, sagging abdominal skin and separated muscles that result from pregnancy, significant weight loss, or aging and cannot be improved through diet and exercise.",
      howItWorks: "Through a horizontal incision above the pubic area, excess skin and fat are removed, abdominal muscles are tightened and sutured together, and the remaining skin is pulled taut and re-draped."
    },
    whyChoose: {
      goals: ["Remove excess abdominal skin", "Tighten separated abdominal muscles", "Create flatter, firmer abdomen", "Improve body contours and proportions"],
      useCases: ["Loose skin after pregnancy or weight loss", "Separated abdominal muscles (diastasis recti)", "Excess fat and skin that won't respond to exercise", "C-section scars or previous abdominal scars"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "The surgeon examines abdominal tissue and muscle separation, discusses the extent of correction needed, and explains incision placement and expected scarring." },
        { title: "Preparation", desc: "Pre-operative instructions include smoking cessation, medication adjustments, arranging help at home, and preparing compression garments and supplies." },
        { title: "Treatment", desc: "Under general anesthesia, an incision is made, excess skin and fat are removed, abdominal muscles are tightened, the navel is repositioned if needed, and incisions are closed." },
        { title: "Recovery", desc: "Drains may be placed temporarily, compression garments are worn for weeks, movement is limited initially, and most patients return to light activities in 2-3 weeks with full recovery in 6-8 weeks." }
      ],
      duration: "2-5 hours depending on extent",
      setting: "Hospital or accredited surgical center",
      anesthesia: "General anesthesia"
    },
    benefits: {
      physical: ["Removes excess skin and fat", "Tightens abdominal muscles", "Creates flatter, firmer abdomen", "Improves posture and core strength"],
      mental: ["Dramatically improves body confidence", "Restores pre-pregnancy body shape", "Increases comfort in clothing"],
      longTerm: ["Permanent removal of excess skin", "Long-lasting muscle tightening", "Improved abdominal contours maintained with stable weight"],
      evidenceLevel: "High — well-established procedure with high patient satisfaction and predictable outcomes"
    },
    whoIsItFor: {
      goodCandidates: ["Adults at stable weight with excess abdominal skin", "Those who have completed childbearing", "Non-smokers in good health", "People with realistic expectations"],
      notSuitableFor: ["Those planning future pregnancies", "People significantly overweight", "Smokers unwilling to quit", "Those with certain medical conditions affecting healing"],
      screeningRequired: "Physical examination to assess skin laxity and muscle separation, medical history review, and discussion of future pregnancy plans and weight stability."
    },
    results: {
      immediate: "Abdomen is flatter and tighter immediately, though swelling, drains, and bandages obscure final contours.",
      shortTerm: "Significant swelling subsides over 4-6 weeks, incision lines begin healing, and improved abdominal profile becomes more apparent.",
      mediumTerm: "Swelling continues to resolve over 3-6 months, scars fade from red to pink, and final abdominal contours emerge.",
      longTerm: "Results are permanent for removed skin and tightened muscles, though pregnancy or significant weight changes can affect outcomes.",
      typicalPlan: "One surgery, typically performed after completing childbearing to avoid compromising results with future pregnancies."
    },
    safety: {
      commonEffects: ["Significant swelling and bruising", "Pain and tightness in abdomen", "Temporary numbness", "Visible scarring that fades over time"],
      rareRisks: ["Infection", "Seroma or hematoma requiring drainage", "Wound healing problems", "Blood clots"],
      protocols: ["Surgery by board-certified plastic surgeon", "Post-operative drains to prevent fluid accumulation", "Compression garments", "Early mobilization to prevent blood clots", "Scar management protocols"]
    },
    faq: [
      { q: "Will I have a visible scar?", a: "Yes, a horizontal scar above the pubic area is unavoidable, but it's designed to be hidden by underwear and swimwear and fades significantly over time." },
      { q: "Can I have children after a tummy tuck?", a: "Yes, but pregnancy can compromise results by stretching the tightened muscles and skin, so it's best performed after completing childbearing." },
      { q: "How long until I can exercise?", a: "Light walking is encouraged immediately, but strenuous exercise and ab workouts should be avoided for 6-8 weeks to allow proper healing." },
      { q: "Will insurance cover a tummy tuck?", a: "Generally no, as it's considered cosmetic, though rare exceptions exist if excess skin causes medical problems like rashes or infections." },
      { q: "Can tummy tuck be combined with other procedures?", a: "Yes, it's commonly combined with liposuction, breast procedures, or other body contouring in a mommy makeover." }
    ]
  },

  "Gastric Bypass": {
    heroValues: [
      { icon: "⏱️", text: "2-4 hour surgery" },
      { icon: "🎯", text: "60-70% weight loss" },
      { icon: "✨", text: "Life-changing results" }
    ],
    whatIsIt: {
      definition: "Gastric bypass is a weight-loss surgery that creates a small stomach pouch and reroutes the small intestine to limit food intake and reduce calorie absorption.",
      purpose: "The procedure helps severely obese patients achieve significant weight loss when diet and exercise have failed, improving obesity-related health conditions and quality of life.",
      howItWorks: "The stomach is divided to create a small pouch, which is then connected directly to the small intestine, bypassing most of the stomach and the first part of the small intestine."
    },
    whyChoose: {
      goals: ["Achieve significant, sustained weight loss", "Improve obesity-related health conditions", "Enhance mobility and quality of life", "Reduce risk of obesity-related diseases"],
      useCases: ["BMI over 40 or BMI over 35 with obesity-related conditions", "Failed weight loss through diet and exercise", "Type 2 diabetes", "Sleep apnea, high blood pressure, or heart disease"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive evaluation including medical history, nutritional assessment, psychological evaluation, and education about lifelong dietary changes and commitment required." },
        { title: "Preparation", desc: "Pre-operative diet to shrink liver, smoking cessation, medication adjustments, and completion of required medical clearances and insurance authorization." },
        { title: "Treatment", desc: "Using laparoscopic or open technique, the stomach is divided to create a small pouch, which is connected to the small intestine, bypassing the larger stomach and duodenum." },
        { title: "Recovery", desc: "Hospital stay of 2-3 days, gradual diet progression from liquids to solids over weeks, lifelong vitamin supplementation, and regular follow-up with bariatric team." }
      ],
      duration: "2-4 hours",
      setting: "Hospital with bariatric surgery program",
      anesthesia: "General anesthesia"
    },
    benefits: {
      physical: ["Significant weight loss (60-70% of excess weight)", "Improvement or resolution of type 2 diabetes", "Reduced blood pressure and cholesterol", "Improved sleep apnea and joint pain"],
      mental: ["Dramatically improves quality of life", "Increases mobility and independence", "Boosts self-esteem and confidence"],
      longTerm: ["Sustained weight loss with lifestyle adherence", "Reduced risk of obesity-related diseases", "Extended life expectancy"],
      evidenceLevel: "High — extensively studied with proven efficacy for weight loss and health improvement"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with BMI over 40 or over 35 with comorbidities", "Those committed to lifelong dietary changes", "People who have tried other weight-loss methods", "Those without substance abuse issues"],
      notSuitableFor: ["People unwilling to commit to dietary changes", "Those with certain gastrointestinal conditions", "Pregnant women", "Individuals with active substance abuse"],
      screeningRequired: "Comprehensive medical evaluation, nutritional assessment, psychological evaluation, and education about procedure requirements and lifestyle changes."
    },
    results: {
      immediate: "Significant restriction in food intake begins immediately as stomach capacity is reduced to 1-2 ounces.",
      shortTerm: "Rapid weight loss of 10-20 pounds per month in first 3-6 months, with improvement in diabetes and other conditions often within weeks.",
      mediumTerm: "Continued weight loss over 12-18 months, reaching maximum weight loss of 60-70% of excess body weight with adherence to program.",
      longTerm: "Weight stabilizes with some regain possible if dietary guidelines not followed, though most maintain 50-60% excess weight loss long-term.",
      typicalPlan: "Lifelong commitment to small portions, vitamin supplementation, regular exercise, and follow-up with bariatric team."
    },
    safety: {
      commonEffects: ["Nausea and vomiting if eating too much or too fast", "Dumping syndrome from high-sugar foods", "Nutritional deficiencies without supplementation", "Loose skin from rapid weight loss"],
      rareRisks: ["Surgical complications like leaks or bleeding", "Bowel obstruction", "Ulcers", "Gallstones"],
      protocols: ["Surgery at accredited bariatric center", "Lifelong vitamin and mineral supplementation", "Regular lab monitoring", "Follow-up with multidisciplinary team", "Support groups"]
    },
    faq: [
      { q: "How much weight will I lose?", a: "Most patients lose 60-70% of excess body weight over 12-18 months, though individual results vary based on adherence to dietary guidelines." },
      { q: "Will I need to take vitamins forever?", a: "Yes, lifelong vitamin and mineral supplementation is essential because the bypassed intestine cannot absorb nutrients as effectively." },
      { q: "Can the surgery be reversed?", a: "While technically possible, reversal is rarely performed and only in cases of severe complications, as it carries significant risks." },
      { q: "Will insurance cover gastric bypass?", a: "Many insurance plans cover bariatric surgery for patients meeting specific BMI and comorbidity criteria after completing required evaluations." },
      { q: "What if I regain weight?", a: "Some weight regain is common but can be minimized through lifelong adherence to dietary guidelines, exercise, and behavioral changes." }
    ]
  },

  "Limb Lengthening Surgery": {
    heroValues: [
      { icon: "⏱️", text: "2-3 hour surgery" },
      { icon: "🎯", text: "2-4 inches gain" },
      { icon: "✨", text: "12-18 month process" }
    ],
    whatIsIt: {
      definition: "Limb lengthening surgery is an orthopedic procedure that gradually increases leg or arm length by surgically cutting bone and using an external or internal device to slowly separate the bone segments as new bone forms.",
      purpose: "The procedure addresses height concerns, limb length discrepancies, or short stature conditions by stimulating new bone growth through controlled distraction.",
      howItWorks: "After surgically cutting the bone (osteotomy), a lengthening device gradually pulls the bone segments apart at about 1mm per day, allowing new bone, muscles, nerves, and blood vessels to form in the gap."
    },
    whyChoose: {
      goals: ["Increase height by 2-4 inches per segment", "Correct limb length discrepancy", "Address short stature concerns", "Improve body proportions"],
      useCases: ["Cosmetic height increase", "Leg length inequality from injury or congenital conditions", "Achondroplasia or other dwarfism conditions", "Post-traumatic bone shortening"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive evaluation including X-rays, bone quality assessment, psychological screening, and discussion of realistic expectations and the demanding recovery process." },
        { title: "Preparation", desc: "Pre-operative physical therapy to strengthen muscles, medical clearances, and education about the device, daily adjustments, and extensive rehabilitation required." },
        { title: "Treatment", desc: "The bone is surgically cut and a lengthening device (external fixator or internal rod) is attached, followed by a latency period before gradual distraction begins at 1mm per day." },
        { title: "Recovery", desc: "Daily device adjustments for 2-4 months during distraction, followed by consolidation phase of 3-6 months for new bone to harden, then device removal and continued rehabilitation." }
      ],
      duration: "2-3 hours for initial surgery",
      setting: "Hospital with orthopedic specialty",
      anesthesia: "General anesthesia"
    },
    benefits: {
      physical: ["Increases height by 2-4 inches per leg segment", "Corrects limb length discrepancies", "Improves body proportions"],
      mental: ["Increases confidence about height", "Improves self-image", "Addresses psychological impact of height concerns"],
      longTerm: ["Permanent height increase", "Improved quality of life for those with significant height dysphoria", "Can be performed on multiple segments if desired"],
      evidenceLevel: "Moderate — established for medical indications, emerging evidence for cosmetic use with recognized risks"
    },
    whoIsItFor: {
      goodCandidates: ["Adults 18+ with closed growth plates", "Those in excellent health and physical condition", "People with realistic expectations about process and outcomes", "Individuals committed to extensive rehabilitation"],
      notSuitableFor: ["Those with poor bone quality or osteoporosis", "People with unrealistic expectations", "Individuals unable to commit to 12-18 month process", "Those with certain medical conditions or infections"],
      screeningRequired: "Comprehensive orthopedic evaluation including bone density scans, X-rays, medical history, and psychological assessment to ensure understanding of risks and commitment."
    },
    results: {
      immediate: "Device is in place and visible, with surgery site pain and inability to walk normally immediately after procedure.",
      shortTerm: "Daily adjustments for 2-4 months gradually increase length by 1mm per day, with pain, stiffness, and limited mobility throughout distraction phase.",
      mediumTerm: "After distraction completes, consolidation phase of 3-6 months allows new bone to harden while mobility gradually improves with physical therapy.",
      longTerm: "Device removed after consolidation, with continued rehabilitation for 6-12 months to regain full strength, flexibility, and function with permanent height increase.",
      typicalPlan: "One segment at a time (femur or tibia), with potential for additional segment after full recovery if more height gain desired."
    },
    safety: {
      commonEffects: ["Significant pain during distraction", "Pin site infections with external fixators", "Muscle contractures and stiffness", "Temporary walking difficulty"],
      rareRisks: ["Nerve or blood vessel damage", "Non-union or delayed bone healing", "Device failure or breakage", "Permanent muscle weakness or joint stiffness"],
      protocols: ["Surgery by experienced orthopedic surgeon", "Daily pin site care with external fixators", "Intensive physical therapy throughout process", "Regular X-rays to monitor bone formation", "Nutritional support"]
    },
    faq: [
      { q: "How much can I lengthen?", a: "Most safely lengthen 2-3 inches per segment (femur or tibia), with maximum around 3-4 inches to avoid complications from excessive lengthening." },
      { q: "How painful is the process?", a: "Pain varies but can be significant during distraction phase, requiring pain management and tolerance for discomfort over several months." },
      { q: "Can I walk during lengthening?", a: "Walking ability is limited during distraction, with most using crutches or wheelchairs, gradually progressing to walking as bone consolidates." },
      { q: "Will my proportions look natural?", a: "Lengthening both femurs maintains proportions better than lengthening only one segment, though torso-to-leg ratio changes occur." },
      { q: "Is limb lengthening safe for cosmetic reasons?", a: "While performed successfully, it carries significant risks and demands extensive recovery, requiring careful consideration of risks versus benefits." }
    ]
  },

  "Gender Reassignment Surgery": {
    heroValues: [
      { icon: "⏱️", text: "4-8 hour surgery" },
      { icon: "🎯", text: "Aligns body with identity" },
      { icon: "✨", text: "Life-affirming care" }
    ],
    whatIsIt: {
      definition: "Gender reassignment surgery, also called gender confirmation or gender-affirming surgery, includes procedures that align an individual's physical characteristics with their gender identity.",
      purpose: "These procedures reduce gender dysphoria and help transgender individuals achieve physical characteristics consistent with their gender identity, improving mental health and quality of life.",
      howItWorks: "Depending on the specific procedure (vaginoplasty, phalloplasty, chest reconstruction, etc.), surgical techniques reshape genital and secondary sex characteristics to create anatomy aligned with the patient's gender identity."
    },
    whyChoose: {
      goals: ["Align physical characteristics with gender identity", "Reduce gender dysphoria", "Improve mental health and wellbeing", "Enhance quality of life and social comfort"],
      useCases: ["Persistent gender dysphoria", "Transgender individuals after hormone therapy", "Desire for physical alignment with gender identity", "Part of comprehensive gender transition"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive evaluation by multidisciplinary team including surgeons, mental health professionals, and endocrinologists to ensure readiness and understand all aspects of surgery." },
        { title: "Preparation", desc: "Requirements typically include psychological letters of support, hormone therapy for specified period, real-life experience in affirmed gender, and hair removal if needed for certain procedures." },
        { title: "Treatment", desc: "Complex surgical procedures vary widely based on type (vaginoplasty, phalloplasty, chest surgery, facial feminization, etc.), generally requiring 4-8 hours under general anesthesia." },
        { title: "Recovery", desc: "Initial hospital stay followed by several weeks of limited activity, careful wound care, dilating regimen for some procedures, and gradual return to activities over 6-12 weeks." }
      ],
      duration: "4-8 hours depending on procedures",
      setting: "Hospital with specialized gender surgery program",
      anesthesia: "General anesthesia"
    },
    benefits: {
      physical: ["Creates anatomy aligned with gender identity", "Reduces or eliminates gender dysphoria", "Improves physical comfort and function"],
      mental: ["Significantly improves mental health and wellbeing", "Reduces anxiety and depression related to gender dysphoria", "Enhances quality of life and social integration"],
      longTerm: ["Permanent physical changes affirm gender identity", "Improved long-term mental health outcomes", "Enhanced ability to live authentically"],
      evidenceLevel: "High — robust evidence shows significant improvements in mental health, quality of life, and reduction in gender dysphoria"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with persistent gender dysphoria", "Those who have completed psychological evaluation", "Individuals on hormone therapy for recommended period", "People with realistic expectations and strong support system"],
      notSuitableFor: ["Those with uncontrolled mental health conditions", "People without adequate support during recovery", "Individuals with certain medical contraindications", "Those who haven't met readiness criteria"],
      screeningRequired: "Comprehensive psychological evaluation, letters from mental health professionals, medical evaluation to ensure surgical safety, and demonstration of readiness per established guidelines."
    },
    results: {
      immediate: "Significant swelling, bruising, and discomfort immediately post-surgery, with new anatomy present but healing required for final appearance.",
      shortTerm: "Initial healing over 6-8 weeks with reduced swelling and improved comfort, though full sensation and function take longer to develop.",
      mediumTerm: "Continued refinement and healing over 6-12 months as swelling fully resolves, sensation returns gradually, and surgical sites mature.",
      longTerm: "Permanent changes create lasting alignment between physical body and gender identity, with ongoing improvements in mental health and quality of life.",
      typicalPlan: "Major surgery may be one-stage or multi-stage depending on procedures chosen, with potential for minor revisions to refine results."
    },
    safety: {
      commonEffects: ["Significant pain and swelling initially", "Temporary urinary changes", "Need for dilating regimen with certain procedures", "Numbness that gradually improves"],
      rareRisks: ["Surgical complications including bleeding or infection", "Wound healing problems", "Loss of sensation", "Functional issues requiring revision"],
      protocols: ["Surgery at specialized gender surgery center", "Multidisciplinary team approach", "Careful pre-operative preparation", "Comprehensive post-operative care and monitoring", "Long-term follow-up"]
    },
    faq: [
      { q: "What is required before surgery?", a: "Requirements typically include psychological evaluation, letters from mental health professionals, hormone therapy for a specified period, and real-life experience in affirmed gender." },
      { q: "Will insurance cover gender surgery?", a: "Many insurance plans now cover gender-affirming surgery when medical necessity is demonstrated and requirements are met, though coverage varies." },
      { q: "How long is recovery?", a: "Initial recovery takes 6-8 weeks before returning to most activities, but complete healing and sensation return can take 12-18 months." },
      { q: "Will results look natural?", a: "Experienced surgeons create natural-appearing and functional results, though outcomes vary based on individual anatomy and specific procedures performed." },
      { q: "Can procedures be reversed?", a: "Gender-affirming surgeries are intended to be permanent and irreversible, which is why thorough evaluation and preparation are essential." }
    ]
  },

  "LASIK": {
    heroValues: [
      { icon: "⏱️", text: "15-30 min per eye" },
      { icon: "🎯", text: "20/20 vision potential" },
      { icon: "✨", text: "Next-day recovery" }
    ],
    whatIsIt: {
      definition: "LASIK (Laser-Assisted In Situ Keratomileusis) is a refractive eye surgery that reshapes the cornea using a laser to correct vision problems and reduce dependence on glasses or contacts.",
      purpose: "The procedure corrects nearsightedness, farsightedness, and astigmatism by precisely removing corneal tissue to change how light focuses on the retina.",
      howItWorks: "A thin flap is created in the cornea, lifted aside, an excimer laser reshapes the underlying corneal tissue based on your prescription, and the flap is repositioned to heal naturally."
    },
    whyChoose: {
      goals: ["Achieve clear vision without glasses or contacts", "Correct nearsightedness, farsightedness, or astigmatism", "Eliminate hassle of corrective lenses", "Improve quality of life and activities"],
      useCases: ["Myopia (nearsightedness)", "Hyperopia (farsightedness)", "Astigmatism", "Desire for freedom from corrective lenses"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive eye exam including corneal thickness measurement, pupil size, refractive error assessment, and screening for conditions that might preclude LASIK." },
        { title: "Preparation", desc: "Discontinue contact lens wear for specified period before surgery, arrange transportation, and receive numbing drops immediately before the procedure." },
        { title: "Treatment", desc: "A corneal flap is created, the underlying cornea is reshaped with precise laser ablation customized to your prescription, and the flap is repositioned to heal." },
        { title: "Recovery", desc: "Vision improves within hours to days, with mild discomfort and light sensitivity initially, protective shields worn while sleeping, and follow-up visits to monitor healing." }
      ],
      duration: "15-30 minutes for both eyes",
      setting: "Outpatient laser vision center",
      anesthesia: "Topical anesthetic eye drops"
    },
    benefits: {
      physical: ["Eliminates or reduces need for glasses or contacts", "Provides clear, crisp vision", "Quick visual recovery"],
      mental: ["Increases confidence and freedom", "Improves quality of life for sports and activities", "Reduces daily hassle of corrective lenses"],
      longTerm: ["Long-lasting vision correction", "Most patients maintain 20/20 or better vision", "Cost-effective compared to lifetime of glasses and contacts"],
      evidenceLevel: "High — extensively studied with excellent safety profile and patient satisfaction rates above 95%"
    },
    whoIsItFor: {
      goodCandidates: ["Adults 18+ with stable prescription for 1+ years", "Those with adequate corneal thickness", "People with mild to moderate refractive errors", "Individuals in good eye health"],
      notSuitableFor: ["Those with thin corneas or certain eye diseases", "Pregnant or nursing women", "People with autoimmune or healing disorders", "Those with unrealistic expectations"],
      screeningRequired: "Comprehensive eye examination including corneal topography, thickness measurement, pupil size, and screening for conditions like keratoconus or severe dry eye."
    },
    results: {
      immediate: "Vision is blurry immediately after surgery with light sensitivity and watering, though improvement begins within hours.",
      shortTerm: "Most patients see 20/20 or better by the next day, with continued improvement over the first week as cornea heals.",
      mediumTerm: "Vision stabilizes over 1-3 months, with final visual acuity achieved as all healing completes and any minor fluctuations resolve.",
      longTerm: "Most patients maintain excellent vision long-term, though natural age-related changes like presbyopia may still require reading glasses after 40.",
      typicalPlan: "One procedure with rare need for enhancement if residual refractive error remains after initial healing."
    },
    safety: {
      commonEffects: ["Temporary dry eyes", "Light sensitivity and glare for weeks to months", "Minor fluctuations in vision during healing"],
      rareRisks: ["Undercorrection or overcorrection requiring enhancement", "Flap complications", "Infection", "Permanent dry eyes or visual disturbances"],
      protocols: ["Pre-operative screening to identify poor candidates", "FDA-approved lasers and techniques", "Antibiotic and anti-inflammatory drops", "Regular follow-up examinations"]
    },
    faq: [
      { q: "Does LASIK hurt?", a: "The procedure itself is painless due to numbing drops, though mild discomfort, scratchiness, or burning may occur for a few hours afterward." },
      { q: "Will I need glasses after LASIK?", a: "Most patients achieve 20/20 vision or better and don't need glasses for distance, though reading glasses may be needed after age 40 due to presbyopia." },
      { q: "How long do results last?", a: "LASIK permanently reshapes the cornea, providing lasting vision correction, though natural age-related changes may affect near vision later in life." },
      { q: "Can both eyes be done at once?", a: "Yes, both eyes are typically treated in the same session for convenience and symmetrical healing." },
      { q: "Am I a candidate for LASIK?", a: "A comprehensive eye exam determines candidacy based on corneal thickness, prescription stability, overall eye health, and absence of certain conditions." }
    ]
  },

  "Dental Implant": {
    heroValues: [
      { icon: "⏱️", text: "1-2 hours per implant" },
      { icon: "🎯", text: "Permanent tooth replacement" },
      { icon: "✨", text: "3-6 month process" }
    ],
    whatIsIt: {
      definition: "A dental implant is a titanium post surgically placed into the jawbone to serve as an artificial tooth root, onto which a crown, bridge, or denture is attached.",
      purpose: "Implants provide permanent, stable tooth replacement that looks, feels, and functions like natural teeth while preserving jawbone and supporting facial structure.",
      howItWorks: "A titanium post is surgically inserted into the jawbone where it integrates through osseointegration over 3-6 months, then an abutment and custom crown are attached to complete the restoration."
    },
    whyChoose: {
      goals: ["Replace missing teeth permanently", "Restore chewing function and speech", "Maintain jawbone and facial structure", "Achieve natural-looking smile"],
      useCases: ["Single missing tooth", "Multiple missing teeth", "Full arch tooth replacement", "Stabilization of dentures"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive dental exam including X-rays and CT scans to assess bone quality and quantity, overall oral health, and create an implant placement plan." },
        { title: "Preparation", desc: "Bone grafting may be needed if insufficient bone exists, followed by healing period, then antibiotic prophylaxis and local anesthesia on implant day." },
        { title: "Treatment", desc: "The titanium implant post is surgically placed into the jawbone, the gum is sutured, and a temporary restoration may be placed while osseointegration occurs over 3-6 months." },
        { title: "Recovery", desc: "After osseointegration completes, an abutment is attached, impressions are taken for the final crown, and the custom restoration is cemented or screwed onto the implant." }
      ],
      duration: "1-2 hours per implant placement",
      setting: "Dental office or oral surgery center",
      anesthesia: "Local anesthesia with optional sedation"
    },
    benefits: {
      physical: ["Permanently replaces missing teeth", "Restores full chewing function", "Preserves jawbone and prevents bone loss", "Supports facial structure"],
      mental: ["Restores confidence in smiling and eating", "Eliminates embarrassment about missing teeth", "Improves quality of life"],
      longTerm: ["Success rates over 95% with proper care", "Can last lifetime with good oral hygiene", "No impact on adjacent healthy teeth unlike bridges"],
      evidenceLevel: "High — gold standard for tooth replacement with decades of research and clinical success"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with missing teeth and adequate jawbone", "Those in good oral and overall health", "Non-smokers or willing to quit", "People committed to good oral hygiene"],
      notSuitableFor: ["Those with insufficient bone without grafting", "Heavy smokers", "Uncontrolled diabetes or certain medical conditions", "People with poor oral hygiene habits"],
      screeningRequired: "Comprehensive dental examination including 3D imaging to assess bone quality and quantity, medical history review, and oral health evaluation."
    },
    results: {
      immediate: "Implant is placed but not yet integrated with bone, with temporary restoration or healing time required before final crown placement.",
      shortTerm: "Some swelling and discomfort for several days after placement, with osseointegration occurring invisibly over 3-6 months.",
      mediumTerm: "After osseointegration completes, abutment and final crown are placed, providing fully functional and natural-looking tooth replacement.",
      longTerm: "With proper oral hygiene and regular dental care, implants can last a lifetime, with occasional crown replacement potentially needed.",
      typicalPlan: "Implant placement followed by 3-6 month healing, then final restoration placement, with regular dental checkups to monitor implant health."
    },
    safety: {
      commonEffects: ["Swelling and bruising at surgical site", "Minor bleeding", "Temporary discomfort", "Temporary difficulty chewing"],
      rareRisks: ["Implant failure to integrate", "Infection", "Nerve damage causing numbness", "Sinus problems for upper jaw implants"],
      protocols: ["Treatment by qualified oral surgeon or periodontist", "Sterile surgical technique", "Antibiotic prophylaxis", "Post-operative care instructions", "Regular monitoring"]
    },
    faq: [
      { q: "How painful is implant surgery?", a: "Most patients report minimal discomfort during the procedure due to anesthesia, with manageable soreness for a few days afterward controlled by over-the-counter pain medication." },
      { q: "How long do dental implants last?", a: "With proper care and oral hygiene, implants can last a lifetime, though the crown attached to the implant may need replacement after 10-15 years." },
      { q: "Will my implant look natural?", a: "Yes, custom-made crowns are designed to match your natural teeth in size, shape, and color, making implants virtually indistinguishable from real teeth." },
      { q: "Can I get implants if I have bone loss?", a: "Bone grafting procedures can build up inadequate bone to support implants, though this adds time and cost to the overall treatment." },
      { q: "How do I care for dental implants?", a: "Implants require the same care as natural teeth including brushing, flossing, and regular dental checkups to maintain gum health around the implant." }
    ]
  },

  "Knee Replacement": {
    heroValues: [
      { icon: "⏱️", text: "1-2 hour surgery" },
      { icon: "🎯", text: "Pain relief" },
      { icon: "✨", text: "Restored mobility" }
    ],
    whatIsIt: {
      definition: "Knee replacement, or total knee arthroplasty, is a surgical procedure that replaces a damaged knee joint with artificial metal and plastic components to relieve pain and restore function.",
      purpose: "The procedure addresses severe knee arthritis or damage that causes chronic pain, stiffness, and disability not relieved by conservative treatments like medications and physical therapy.",
      howItWorks: "The damaged bone and cartilage are removed from the thigh bone, shin bone, and kneecap, and replaced with prosthetic components made of metal alloys and high-grade plastics that recreate the knee joint surface."
    },
    whyChoose: {
      goals: ["Eliminate chronic knee pain", "Restore mobility and function", "Improve quality of life", "Return to daily activities"],
      useCases: ["Severe osteoarthritis of the knee", "Rheumatoid arthritis", "Post-traumatic arthritis", "Avascular necrosis of the knee"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive evaluation including X-rays, physical examination, medical history review, and discussion of expectations, risks, and alternatives to surgery." },
        { title: "Preparation", desc: "Pre-operative medical clearances, physical therapy to strengthen leg muscles, home preparation for recovery, and pre-surgical instructions including medication adjustments." },
        { title: "Treatment", desc: "Under anesthesia, damaged cartilage and bone are removed, surfaces are shaped to accept prosthetic components, and metal and plastic implants are secured to create new joint surfaces." },
        { title: "Recovery", desc: "Hospital stay of 1-3 days with immediate physical therapy, gradual progression to walking with assistive devices, outpatient therapy for 6-12 weeks, and continued improvement for up to one year." }
      ],
      duration: "1-2 hours",
      setting: "Hospital with orthopedic surgery department",
      anesthesia: "General or spinal anesthesia"
    },
    benefits: {
      physical: ["Eliminates or significantly reduces chronic knee pain", "Restores mobility and range of motion", "Improves stability and function", "Allows return to daily activities"],
      mental: ["Dramatically improves quality of life", "Reduces depression from chronic pain", "Increases independence"],
      longTerm: ["Prosthetic joints last 15-20 years or more", "Sustained pain relief and function", "Ability to enjoy activities previously limited by pain"],
      evidenceLevel: "High — one of the most successful orthopedic procedures with excellent long-term outcomes and patient satisfaction"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with severe knee arthritis affecting daily life", "Those who have tried conservative treatments without success", "People in reasonable overall health", "Individuals committed to post-operative rehabilitation"],
      notSuitableFor: ["Those with active infections", "People with inadequate bone quality", "Individuals with certain medical conditions increasing surgical risk", "Those unable or unwilling to participate in rehabilitation"],
      screeningRequired: "Comprehensive medical evaluation including cardiovascular and pulmonary assessment, X-rays, laboratory tests, and dental clearance to minimize infection risk."
    },
    results: {
      immediate: "Knee pain from arthritis is gone but surgical pain and swelling are present, with limited mobility and need for assistive devices.",
      shortTerm: "Steady improvement over 6-12 weeks with physical therapy, decreasing pain, increasing range of motion, and progression from walker to cane to independent walking.",
      mediumTerm: "Continued improvement in strength, stability, and function over 3-6 months as muscles strengthen and adaptation to new joint occurs.",
      longTerm: "Most patients achieve significant pain relief, improved mobility, and ability to perform daily activities with prosthetic joint functioning well for 15-20+ years.",
      typicalPlan: "One surgery with expectation of long-term success, though revision surgery may eventually be needed if prosthesis wears out or loosens."
    },
    safety: {
      commonEffects: ["Post-operative pain and swelling", "Stiffness requiring physical therapy", "Temporary numbness around incision", "Risk of blood clots requiring prevention measures"],
      rareRisks: ["Infection requiring antibiotics or revision surgery", "Blood clots or pulmonary embolism", "Implant loosening or wear over time", "Nerve or blood vessel damage"],
      protocols: ["Surgery at experienced orthopedic center", "Antibiotic prophylaxis", "Blood clot prevention measures", "Early mobilization and physical therapy", "Regular follow-up to monitor implant"]
    },
    faq: [
      { q: "How long does a knee replacement last?", a: "Modern knee prostheses typically last 15-20 years or more, with some lasting even longer depending on activity level and body weight." },
      { q: "Will I be able to kneel after surgery?", a: "While possible, many patients find kneeling uncomfortable due to sensitivity over the incision site, though function and mobility are otherwise excellent." },
      { q: "When can I drive after knee replacement?", a: "Most patients can resume driving at 4-6 weeks once off pain medications and able to safely control the vehicle." },
      { q: "Will I set off metal detectors?", a: "Knee implants may trigger metal detectors at airports, so many patients carry a medical implant card, though modern detectors are less sensitive." },
      { q: "What activities can I do after knee replacement?", a: "Low-impact activities like walking, swimming, golf, and cycling are encouraged, while high-impact activities like running are typically discouraged to preserve implant longevity." }
    ]
  },

  "Hip Replacement": {
    heroValues: [
      { icon: "⏱️", text: "1-2 hour surgery" },
      { icon: "🎯", text: "Pain elimination" },
      { icon: "✨", text: "Restored mobility" }
    ],
    whatIsIt: {
      definition: "Hip replacement, or total hip arthroplasty, is a surgical procedure that replaces a damaged hip joint with artificial components to eliminate pain and restore function.",
      purpose: "The procedure addresses severe hip arthritis or damage causing chronic pain, stiffness, and limited mobility that interferes with daily activities and doesn't respond to conservative treatment.",
      howItWorks: "The damaged femoral head (ball) is removed and replaced with a metal or ceramic prosthesis, while the damaged acetabulum (socket) is resurfaced with a metal shell and plastic liner to create a new hip joint."
    },
    whyChoose: {
      goals: ["Eliminate chronic hip pain", "Restore mobility and function", "Improve quality of life", "Return to normal activities"],
      useCases: ["Severe hip osteoarthritis", "Rheumatoid arthritis", "Hip fracture in elderly", "Avascular necrosis of femoral head"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive evaluation including X-rays, physical examination, medical history, and discussion of prosthesis options, surgical approach, and expected outcomes." },
        { title: "Preparation", desc: "Medical clearances, pre-operative exercises to strengthen muscles, dental work if needed, home safety preparations, and medication adjustments." },
        { title: "Treatment", desc: "Through an incision at the hip, damaged bone and cartilage are removed, the femoral head is replaced with a prosthetic ball on a stem, and the socket is resurfaced with new components." },
        { title: "Recovery", desc: "Hospital stay of 1-3 days with immediate physical therapy, progression from walker to cane, outpatient therapy for 6-12 weeks, and hip precautions to prevent dislocation initially." }
      ],
      duration: "1-2 hours",
      setting: "Hospital with orthopedic surgery department",
      anesthesia: "General or spinal anesthesia"
    },
    benefits: {
      physical: ["Eliminates chronic hip pain", "Restores mobility and range of motion", "Improves walking ability", "Allows return to activities"],
      mental: ["Dramatically improves quality of life", "Increases independence", "Reduces depression from chronic pain"],
      longTerm: ["Prosthetic hips last 20-30 years", "Sustained pain relief and function", "Improved sleep without pain"],
      evidenceLevel: "High — highly successful procedure with excellent long-term outcomes and patient satisfaction rates above 90%"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with severe hip arthritis limiting daily life", "Those who have exhausted conservative treatments", "People in good overall health", "Individuals committed to rehabilitation"],
      notSuitableFor: ["Those with active infections", "People with inadequate bone stock", "Individuals with medical conditions increasing risks", "Those unable to follow post-operative precautions"],
      screeningRequired: "Complete medical evaluation including cardiac and pulmonary assessment, hip X-rays, blood tests, dental clearance, and discussion of risks and benefits."
    },
    results: {
      immediate: "Hip arthritis pain is eliminated but surgical pain is present, with restricted mobility and need for assistive devices and hip precautions.",
      shortTerm: "Steady improvement over 6-12 weeks with physical therapy, increasing range of motion and strength, progressing from walker to cane to independent walking.",
      mediumTerm: "Continued improvement in function and comfort over 3-6 months as muscles strengthen, adaptation to prosthetic hip occurs, and restrictions are gradually lifted.",
      longTerm: "Most patients achieve excellent pain relief and function, returning to normal activities with prosthetic hip performing well for 20-30 years.",
      typicalPlan: "One surgery with expectation of decades of successful function, though eventual revision may be needed if prosthesis wears or loosens."
    },
    safety: {
      commonEffects: ["Post-operative pain and swelling", "Leg length difference requiring shoe lift", "Hip precautions to prevent dislocation initially", "Blood clot risk requiring prevention"],
      rareRisks: ["Hip dislocation requiring closed or open reduction", "Infection", "Blood clots or pulmonary embolism", "Implant loosening over time"],
      protocols: ["Surgery at experienced orthopedic center", "Antibiotic and blood clot prophylaxis", "Hip precautions education", "Early mobilization", "Regular follow-up X-rays"]
    },
    faq: [
      { q: "How long does a hip replacement last?", a: "Modern hip prostheses typically last 20-30 years, with many patients never needing revision surgery in their lifetime." },
      { q: "What are hip precautions?", a: "Movement restrictions for 6-12 weeks to prevent dislocation, including avoiding bending hip past 90 degrees, crossing legs, or rotating hip inward." },
      { q: "When can I return to normal activities?", a: "Most patients return to normal daily activities within 3-6 months, with low-impact activities encouraged and high-impact activities typically discouraged." },
      { q: "Will one leg be longer than the other?", a: "Surgeons strive for equal leg lengths, but small differences may occur and are often correctable with a shoe lift if bothersome." },
      { q: "Can I have an MRI with a hip replacement?", a: "Modern hip prostheses are MRI-compatible, though image quality near the implant may be affected by metal artifact." }
    ]
  },

  "Colonoscopy": {
    heroValues: [
      { icon: "⏱️", text: "30-60 min procedure" },
      { icon: "🎯", text: "Cancer prevention" },
      { icon: "✨", text: "Same-day recovery" }
    ],
    whatIsIt: {
      definition: "A colonoscopy is a diagnostic procedure that uses a flexible tube with a camera to examine the entire colon and rectum for abnormalities, polyps, or signs of disease.",
      purpose: "The procedure screens for colorectal cancer, investigates symptoms like bleeding or abdominal pain, monitors inflammatory bowel disease, and removes polyps before they become cancerous.",
      howItWorks: "A colonoscope is gently inserted through the rectum and advanced through the colon while the physician examines the lining, takes biopsies if needed, and removes any polyps found."
    },
    whyChoose: {
      goals: ["Screen for colorectal cancer", "Investigate gastrointestinal symptoms", "Remove precancerous polyps", "Monitor inflammatory bowel disease"],
      useCases: ["Routine screening for adults 45+", "Blood in stool or rectal bleeding", "Chronic diarrhea or abdominal pain", "Personal or family history of colon polyps or cancer"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "The physician reviews your medical history, medications, and symptoms, explains the procedure and preparation requirements, and discusses sedation options." },
        { title: "Preparation", desc: "A clear liquid diet for 24 hours before the procedure and bowel preparation solution to completely empty the colon are essential for successful examination." },
        { title: "Treatment", desc: "Under sedation, the colonoscope is carefully inserted and advanced through the entire colon while the physician examines the lining and removes any polyps found." },
        { title: "Recovery", desc: "You rest in recovery for 30-60 minutes until sedation wears off, receive preliminary results, and must have someone drive you home due to sedation effects." }
      ],
      duration: "30-60 minutes",
      setting: "Hospital or endoscopy center",
      anesthesia: "Conscious sedation or monitored anesthesia"
    },
    benefits: {
      physical: ["Detects colorectal cancer at early, curable stages", "Removes precancerous polyps preventing cancer", "Diagnoses cause of symptoms", "Monitors inflammatory bowel disease"],
      mental: ["Provides peace of mind through cancer screening", "Reduces anxiety about symptoms", "Enables early intervention"],
      longTerm: ["Reduces colorectal cancer risk by up to 90% with regular screening", "Prevents cancer development through polyp removal", "Establishes screening baseline for future surveillance"],
      evidenceLevel: "High — gold standard for colorectal cancer screening with proven mortality reduction"
    },
    whoIsItFor: {
      goodCandidates: ["Adults 45+ for routine screening", "Those with family history of colorectal cancer", "People with gastrointestinal symptoms needing evaluation", "Individuals with inflammatory bowel disease"],
      notSuitableFor: ["Those with severe cardiac or pulmonary disease", "People with suspected bowel perforation", "Recent heart attack or severe bleeding disorder", "Inability to complete bowel preparation"],
      screeningRequired: "Medical history review, medication assessment, and evaluation of conditions that might increase procedural risk or require antibiotic prophylaxis."
    },
    results: {
      immediate: "Preliminary findings are discussed after you wake, including whether polyps were found and removed, though pathology results take several days.",
      shortTerm: "Mild cramping or bloating may occur for a few hours as residual air is expelled, with normal diet and activities resumed the same day.",
      mediumTerm: "Polyp pathology results are available within a week, determining whether findings were benign, precancerous, or requiring further evaluation.",
      longTerm: "Screening interval is determined by findings, ranging from 10 years if normal to 1-3 years if polyps were found, based on size, number, and pathology.",
      typicalPlan: "Regular screening colonoscopies at intervals determined by findings and risk factors, typically every 10 years if normal for average-risk individuals."
    },
    safety: {
      commonEffects: ["Bloating and cramping from air insufflation", "Drowsiness from sedation", "Mild sore throat if scope caused irritation"],
      rareRisks: ["Perforation (hole in colon wall)", "Bleeding from biopsy or polyp removal", "Adverse reaction to sedation", "Incomplete examination due to poor preparation"],
      protocols: ["Performance by experienced gastroenterologist", "Appropriate sedation and monitoring", "Quality bowel preparation", "Post-procedure instructions and warning signs"]
    },
    faq: [
      { q: "Is colonoscopy painful?", a: "The procedure itself is painless due to sedation, though bowel preparation is unpleasant and mild cramping may occur afterward from residual air." },
      { q: "How often do I need a colonoscopy?", a: "If normal and average risk, every 10 years; if polyps found, every 3-5 years; if higher risk factors, potentially more frequently." },
      { q: "What if polyps are found?", a: "Most polyps are removed during the colonoscopy and sent for pathology to determine if they were precancerous, guiding future screening intervals." },
      { q: "Can I eat normally after colonoscopy?", a: "Yes, you can resume your normal diet immediately after the procedure once you feel ready." },
      { q: "Why is bowel preparation so important?", a: "A clean colon allows complete visualization of the lining, ensuring no polyps or abnormalities are missed due to residual stool." }
    ]
  },

  "IVF": {
    heroValues: [
      { icon: "⏱️", text: "2-6 week cycle" },
      { icon: "🎯", text: "Pregnancy success" },
      { icon: "✨", text: "Family building" }
    ],
    whatIsIt: {
      definition: "In vitro fertilization (IVF) is an assisted reproductive technology where eggs are retrieved from ovaries, fertilized with sperm in a laboratory, and resulting embryos are transferred to the uterus.",
      purpose: "IVF helps individuals and couples conceive when natural conception is not possible or unlikely due to infertility factors affecting either partner.",
      howItWorks: "Ovaries are stimulated with hormones to produce multiple eggs, eggs are retrieved through a minor procedure, fertilized with sperm in the lab, and viable embryos are transferred to the uterus."
    },
    whyChoose: {
      goals: ["Achieve pregnancy when natural conception has failed", "Overcome infertility obstacles", "Build a family", "Use genetic testing to prevent inherited conditions"],
      useCases: ["Blocked or damaged fallopian tubes", "Male factor infertility", "Ovulation disorders", "Endometriosis", "Unexplained infertility", "Genetic disease prevention"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive fertility evaluation including hormone testing, semen analysis, ultrasound, and discussion of success rates, costs, and treatment plan." },
        { title: "Preparation", desc: "Ovarian stimulation with daily hormone injections for 8-14 days while monitoring follicle development through ultrasounds and blood tests." },
        { title: "Treatment", desc: "Egg retrieval under sedation, fertilization with sperm in the laboratory, embryo culture for 3-6 days, and embryo transfer into the uterus through the cervix." },
        { title: "Recovery", desc: "Rest for 1-2 days after transfer, progesterone supplementation to support implantation, and pregnancy test 9-14 days later to determine success." }
      ],
      duration: "2-6 weeks for complete cycle",
      setting: "Fertility clinic",
      anesthesia: "Conscious sedation for egg retrieval"
    },
    benefits: {
      physical: ["Enables pregnancy when natural conception not possible", "Allows genetic testing of embryos", "Can use donor eggs or sperm if needed"],
      mental: ["Provides hope and pathway to parenthood", "Addresses emotional distress of infertility", "Empowers individuals with fertility options"],
      longTerm: ["Successful pregnancy and childbirth", "Can freeze extra embryos for future pregnancies", "Prevents transmission of genetic diseases with PGT"],
      evidenceLevel: "High — well-established fertility treatment with extensive outcome data and continuously improving success rates"
    },
    whoIsItFor: {
      goodCandidates: ["Women under 43 with infertility lasting 6-12 months", "Couples with diagnosed infertility causes", "Those with genetic concerns", "Individuals committed to the physical and emotional process"],
      notSuitableFor: ["Women with conditions preventing safe pregnancy", "Those with certain hormone-sensitive cancers", "Individuals with ovarian dysfunction preventing egg retrieval", "Those unable to commit to intensive process"],
      screeningRequired: "Comprehensive fertility testing including ovarian reserve assessment, uterine evaluation, hormone levels, semen analysis, and infectious disease screening."
    },
    results: {
      immediate: "Eggs are retrieved and fertilization is confirmed within 24 hours, with embryo development monitored daily in the laboratory.",
      shortTerm: "Embryo transfer occurs 3-6 days after retrieval, followed by a two-week wait until pregnancy test to determine if implantation was successful.",
      mediumTerm: "If pregnancy test is positive, ultrasound at 6-7 weeks confirms pregnancy viability, with graduation to regular obstetric care at 8-10 weeks.",
      longTerm: "Successful IVF pregnancies have similar outcomes to natural pregnancies, with healthy babies born at term after standard prenatal care.",
      typicalPlan: "One cycle at a time, with cumulative success improving over multiple cycles, though outcomes depend heavily on age and fertility factors."
    },
    safety: {
      commonEffects: ["Bloating and discomfort from ovarian stimulation", "Mood swings from hormones", "Cramping after egg retrieval and embryo transfer"],
      rareRisks: ["Ovarian hyperstimulation syndrome (OHSS)", "Multiple pregnancy", "Ectopic pregnancy", "Ovarian torsion"],
      protocols: ["Careful hormone dosing and monitoring", "Ultrasound and blood test tracking", "Single embryo transfer to avoid multiples", "OHSS prevention strategies"]
    },
    faq: [
      { q: "What are IVF success rates?", a: "Success varies by age, with women under 35 having 40-50% success per cycle, decreasing with age to 10-15% over 40." },
      { q: "How many cycles will I need?", a: "This varies, but cumulative success improves with multiple cycles, and many patients achieve pregnancy within 3-4 attempts." },
      { q: "Is IVF covered by insurance?", a: "Coverage varies widely by location and plan, with some states mandating coverage while others don't, making it expensive out-of-pocket." },
      { q: "Can I choose my baby's gender?", a: "While technically possible through genetic testing, sex selection for non-medical reasons is ethically controversial and illegal in many countries." },
      { q: "Are IVF babies healthy?", a: "Yes, IVF babies are as healthy as naturally conceived babies, though multiple pregnancies (if more than one embryo transferred) carry increased risks." }
    ]
  },

  "Stem Cell Therapy": {
    heroValues: [
      { icon: "⏱️", text: "1-3 hour procedure" },
      { icon: "🎯", text: "Regenerative healing" },
      { icon: "✨", text: "Variable outcomes" }
    ],
    whatIsIt: {
      definition: "Stem cell therapy involves harvesting stem cells (usually from bone marrow or adipose tissue), processing them, and injecting them into damaged tissues to promote healing and regeneration.",
      purpose: "The treatment aims to reduce inflammation, promote tissue repair, and potentially regenerate damaged structures in conditions like arthritis, tendon injuries, or degenerative diseases.",
      howItWorks: "Stem cells are extracted from the patient's own tissue or donor sources, concentrated, and injected into the target area where they may differentiate into needed cell types and release healing factors."
    },
    whyChoose: {
      goals: ["Accelerate healing of injuries", "Reduce chronic pain and inflammation", "Potentially regenerate damaged tissue", "Avoid or delay surgical intervention"],
      useCases: ["Osteoarthritis of joints", "Tendon and ligament injuries", "Back pain from disc degeneration", "Certain autoimmune conditions"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Evaluation of condition, review of imaging studies, discussion of evidence for your specific condition, realistic expectations, and informed consent about experimental nature." },
        { title: "Preparation", desc: "Stem cell harvest is scheduled, typically from bone marrow (hip) or adipose tissue (abdomen), under local anesthesia with sedation if needed." },
        { title: "Treatment", desc: "Harvested tissue is processed in a laboratory to concentrate stem cells, which are then injected into the target area under ultrasound or fluoroscopic guidance." },
        { title: "Recovery", desc: "Rest for 24-48 hours, gradual return to activities over weeks, and physical therapy to support healing, with variable timeframes for potential benefits to appear." }
      ],
      duration: "1-3 hours including harvest and injection",
      setting: "Specialized regenerative medicine clinic",
      anesthesia: "Local anesthesia with optional sedation"
    },
    benefits: {
      physical: ["May reduce pain and inflammation", "Potential for tissue regeneration and healing", "Minimally invasive compared to surgery"],
      mental: ["Provides hope for difficult-to-treat conditions", "Avoids psychological impact of major surgery", "Empowerment through novel treatment option"],
      longTerm: ["Potential for sustained improvement if effective", "May delay or prevent need for surgery", "Uses body's own healing mechanisms"],
      evidenceLevel: "Moderate to Emerging — evidence varies by condition, with stronger support for some orthopedic applications than others"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with degenerative joint conditions", "Those who have failed conservative treatments", "People seeking to avoid or delay surgery", "Individuals understanding experimental nature"],
      notSuitableFor: ["Those with active infections or cancer", "People with unrealistic expectations", "Individuals expecting guaranteed results", "Those unable to afford out-of-pocket costs"],
      screeningRequired: "Medical evaluation to confirm diagnosis and appropriateness, imaging studies, discussion of evidence specific to your condition, and informed consent about experimental status."
    },
    results: {
      immediate: "Mild discomfort and swelling at harvest and injection sites, with no immediate clinical improvement expected.",
      shortTerm: "Initial healing occurs over 2-4 weeks, though benefits from stem cells, if any, typically don't appear for several weeks to months.",
      mediumTerm: "If effective, gradual improvement in pain and function may occur over 3-6 months as stem cells potentially promote tissue repair.",
      longTerm: "Long-term outcomes are highly variable and condition-dependent, with some patients reporting sustained benefits and others seeing minimal change.",
      typicalPlan: "Often one treatment, with potential for repeat injections if initial response is positive, though optimal protocols remain under investigation."
    },
    safety: {
      commonEffects: ["Pain and swelling at harvest and injection sites", "Temporary increased discomfort in treated area", "Bruising"],
      rareRisks: ["Infection at harvest or injection site", "Nerve or blood vessel injury", "Tumor formation (theoretical with certain stem cell types)", "No benefit despite cost and discomfort"],
      protocols: ["Treatment at reputable facility following standards", "Sterile technique", "Image-guided injection for accuracy", "Informed consent about experimental nature and costs"]
    },
    faq: [
      { q: "Does stem cell therapy really work?", a: "Evidence varies by condition, with some orthopedic applications showing promise in studies while claims for other conditions lack robust evidence." },
      { q: "Is stem cell therapy FDA approved?", a: "Very few stem cell therapies are FDA-approved, and most are considered investigational, requiring careful evaluation of provider claims." },
      { q: "Will insurance cover stem cell therapy?", a: "Most insurance doesn't cover stem cell treatments as they're considered experimental, making them expensive out-of-pocket costs." },
      { q: "How long until I see results?", a: "If effective, improvements typically appear gradually over 3-6 months, not immediately, as tissue regeneration takes time." },
      { q: "Can stem cells cure my condition?", a: "Stem cell therapy is not a cure for most conditions but may provide symptom relief or slow progression in some cases." }
    ]
  },

  "Exosome Therapy": {
    heroValues: [
      { icon: "⏱️", text: "30-60 min injection" },
      { icon: "🎯", text: "Cellular communication" },
      { icon: "✨", text: "Emerging treatment" }
    ],
    whatIsIt: {
      definition: "Exosome therapy uses tiny vesicles secreted by stem cells, containing growth factors and genetic material, injected into target tissues to promote healing and reduce inflammation.",
      purpose: "Exosomes are theorized to enhance tissue repair and regeneration by delivering healing signals to cells without transplanting actual stem cells.",
      howItWorks: "Exosomes derived from mesenchymal stem cells are isolated, purified, and injected into damaged tissues where they may modulate inflammation and promote healing through cell-to-cell communication."
    },
    whyChoose: {
      goals: ["Promote tissue healing without stem cell harvest", "Reduce inflammation", "Potentially enhance regeneration", "Minimize procedural invasiveness"],
      useCases: ["Joint arthritis and pain", "Tendon and ligament injuries", "Skin rejuvenation (cosmetic use)", "Hair loss (investigational)"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Evaluation of condition, discussion of extremely limited clinical evidence, clarification that this is highly experimental, and informed consent about costs and uncertainty." },
        { title: "Preparation", desc: "The treatment area is prepared and cleansed, and exosome product (typically derived from donor stem cells) is prepared for injection." },
        { title: "Treatment", desc: "Exosomes are injected into the target tissue under ultrasound guidance or through direct injection, taking 30-60 minutes depending on the area treated." },
        { title: "Recovery", desc: "Minimal recovery time with potential mild soreness, gradual return to activities, and monitoring for any response over weeks to months." }
      ],
      duration: "30-60 minutes",
      setting: "Regenerative medicine clinic",
      anesthesia: "Local anesthesia if needed"
    },
    benefits: {
      physical: ["Theoretically reduces inflammation", "May promote tissue healing", "Less invasive than stem cell harvest"],
      mental: ["Provides experimental option for difficult conditions", "Avoids major procedures", "Offers hope in absence of other options"],
      longTerm: ["Unknown long-term efficacy", "Potential for repeated treatments", "May complement other therapies"],
      evidenceLevel: "Emerging — very limited clinical evidence with most data from cell culture and animal studies, human efficacy largely unproven"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with chronic conditions seeking experimental options", "Those who understand limited evidence", "People willing to accept out-of-pocket costs with uncertain benefits", "Individuals exhausting conventional treatments"],
      notSuitableFor: ["Those expecting proven results", "People with active malignancies", "Individuals unable to afford experimental treatment", "Those seeking FDA-approved therapies"],
      screeningRequired: "Medical evaluation to confirm diagnosis, extensive discussion of experimental nature and lack of robust evidence, and informed consent about costs and uncertain outcomes."
    },
    results: {
      immediate: "Mild injection site discomfort with no immediate clinical effects expected.",
      shortTerm: "Potential gradual reduction in symptoms over weeks to months if treatment is effective, though placebo response is possible.",
      mediumTerm: "Variable outcomes with some patients reporting improvements while others see no benefit, making it difficult to predict individual response.",
      longTerm: "Long-term efficacy is unknown due to lack of controlled studies, and durability of any benefits remains unclear.",
      typicalPlan: "Protocols vary widely between providers as no standardized treatment regimen exists, with some recommending series of injections."
    },
    safety: {
      commonEffects: ["Injection site soreness", "Temporary increased discomfort", "Potential lack of benefit despite cost"],
      rareRisks: ["Infection", "Allergic reaction to exosome product", "Unknown long-term safety profile", "Immune reactions"],
      protocols: ["Ensure provider follows sterile technique", "Verify source and processing of exosome product", "Informed consent about experimental nature", "Realistic expectations about uncertain efficacy"]
    },
    faq: [
      { q: "Are exosomes better than stem cells?", a: "There is insufficient evidence to make this comparison, and both remain largely experimental for most applications." },
      { q: "Is exosome therapy FDA approved?", a: "No exosome products are currently FDA-approved for therapeutic use, making all treatments experimental and unregulated." },
      { q: "How much does exosome therapy cost?", a: "Costs typically range from $1000-$5000 or more per treatment, entirely out-of-pocket as insurance doesn't cover experimental therapies." },
      { q: "What conditions can exosomes treat?", a: "While marketed for many conditions, robust clinical evidence is lacking for most, with providers' claims often exceeding scientific support." },
      { q: "How do I know exosomes are legitimate?", a: "Be very cautious of exaggerated claims, ensure provider is reputable, ask about product source and quality control, and understand this is experimental." }
    ]
  },

  "PRP Therapy": {
    heroValues: [
      { icon: "⏱️", text: "30-90 min procedure" },
      { icon: "🎯", text: "Natural healing boost" },
      { icon: "✨", text: "Moderate evidence" }
    ],
    whatIsIt: {
      definition: "Platelet-Rich Plasma (PRP) therapy involves drawing your blood, concentrating the platelets through centrifugation, and injecting the platelet-rich plasma into injured tissues to promote healing.",
      purpose: "The concentrated platelets release growth factors that may accelerate tissue repair, reduce inflammation, and improve healing in various orthopedic and aesthetic conditions.",
      howItWorks: "Blood is drawn and spun in a centrifuge to separate and concentrate platelets, which are then injected into the target area where released growth factors potentially stimulate healing."
    },
    whyChoose: {
      goals: ["Accelerate healing of sports injuries", "Reduce chronic tendon or joint pain", "Stimulate hair growth in hair loss", "Promote skin rejuvenation (cosmetic use)"],
      useCases: ["Tennis elbow and other tendinopathies", "Mild to moderate knee arthritis", "Plantar fasciitis", "Hair loss (androgenic alopecia)", "Facial rejuvenation"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Evaluation of condition with imaging if needed, discussion of evidence for your specific condition, realistic expectations about outcomes, and informed consent." },
        { title: "Preparation", desc: "Blood is drawn (typically 30-60ml), placed in specialized tubes, and centrifuged for 10-15 minutes to concentrate platelets." },
        { title: "Treatment", desc: "The platelet-rich plasma is drawn up and injected into the target area under ultrasound guidance for orthopedic applications or multiple skin injections for aesthetic use." },
        { title: "Recovery", desc: "Rest for 24-48 hours avoiding anti-inflammatory medications that could interfere with healing, gradual return to activities, and monitoring for response over weeks." }
      ],
      duration: "30-90 minutes including blood draw and injection",
      setting: "Sports medicine clinic or aesthetic clinic",
      anesthesia: "Local anesthesia if needed"
    },
    benefits: {
      physical: ["May reduce pain and improve function in certain conditions", "Uses your own blood (autologous treatment)", "Minimally invasive compared to surgery"],
      mental: ["Provides non-surgical option for chronic conditions", "Avoids risks of major surgery", "Empowerment through regenerative approach"],
      longTerm: ["Potential for sustained improvement if effective", "Can be repeated if beneficial", "May delay need for surgery in some cases"],
      evidenceLevel: "Moderate — mixed evidence with some conditions showing benefit in studies while others show limited advantage over placebo"
    },
    whoIsItFor: {
      goodCandidates: ["Adults with chronic tendon injuries or mild arthritis", "Those who have failed conservative treatments", "People seeking to avoid surgery", "Individuals with realistic expectations"],
      notSuitableFor: ["Those with bleeding disorders", "Active infections", "People on anticoagulation therapy", "Those expecting guaranteed results"],
      screeningRequired: "Medical evaluation to confirm diagnosis and appropriateness, imaging to assess severity, and discussion of evidence specific to your condition."
    },
    results: {
      immediate: "Mild to moderate pain and swelling at injection site, with no immediate improvement expected.",
      shortTerm: "Potential gradual reduction in pain and improvement in function over 4-8 weeks if treatment is effective for your condition.",
      mediumTerm: "Maximum benefit typically seen at 3-6 months if PRP is effective, though response varies considerably between individuals and conditions.",
      longTerm: "Duration of benefit is variable, with some patients experiencing sustained improvement while others require repeat treatments or see benefits fade.",
      typicalPlan: "Often a series of 2-3 injections spaced weeks apart, with potential for repeat treatments if initial response is favorable."
    },
    safety: {
      commonEffects: ["Pain and swelling at injection site", "Temporary increased discomfort in treated area", "Bruising"],
      rareRisks: ["Infection", "Nerve injury", "No benefit despite cost", "Allergic reaction (very rare with autologous treatment)"],
      protocols: ["Sterile blood draw and processing", "Image-guided injection for accuracy in orthopedic applications", "Avoidance of NSAIDs after treatment", "Appropriate patient selection"]
    },
    faq: [
      { q: "Does PRP really work?", a: "Evidence is mixed and condition-dependent, with better support for certain tendinopathies and mild arthritis, while some applications lack robust evidence." },
      { q: "Is PRP covered by insurance?", a: "Most insurance considers PRP experimental and doesn't cover it, making it an out-of-pocket expense typically ranging $500-$2000 per treatment." },
      { q: "How many PRP treatments do I need?", a: "Protocols vary but often involve 2-3 injections spaced 2-4 weeks apart, with potential for additional treatments if beneficial." },
      { q: "Is PRP better than cortisone injections?", a: "Studies show mixed results, with cortisone providing faster but shorter-term relief while PRP may offer more gradual, potentially longer-lasting benefits in some conditions." },
      { q: "Can PRP reverse arthritis?", a: "No, PRP cannot reverse structural arthritis damage but may provide symptomatic relief and potentially slow progression in mild to moderate cases." }
    ]
  },

  "Plasma Exchange Therapy": {
    heroValues: [
      { icon: "⏱️", text: "2-4 hour session" },
      { icon: "🎯", text: "Blood purification" },
      { icon: "✨", text: "Medical necessity" }
    ],
    whatIsIt: {
      definition: "Plasma exchange (plasmapheresis) is a procedure that removes, treats, and returns blood to your body, replacing the plasma portion containing harmful antibodies or substances with donor plasma or albumin.",
      purpose: "The treatment removes disease-causing antibodies, proteins, or toxins from the blood in autoimmune, neurological, and hematological conditions when other treatments have failed.",
      howItWorks: "Blood is withdrawn, separated into cells and plasma using a special machine, the plasma is discarded and replaced with donor plasma or albumin solution, and the reconstituted blood is returned to your body."
    },
    whyChoose: {
      goals: ["Remove harmful antibodies or proteins from blood", "Treat severe autoimmune conditions", "Manage neurological crises", "Provide rapid intervention when needed"],
      useCases: ["Guillain-Barré syndrome", "Myasthenia gravis crisis", "Chronic inflammatory demyelinating polyneuropathy (CIDP)", "Goodpasture syndrome", "Thrombotic thrombocytopenic purpura (TTP)"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive evaluation by specialist confirms diagnosis requiring plasma exchange, discusses risks and benefits, and determines treatment schedule and number of sessions needed." },
        { title: "Preparation", desc: "Vascular access is established (peripheral or central line), pre-procedure labs are checked, and calcium supplementation may be given to prevent reactions." },
        { title: "Treatment", desc: "Blood is continuously withdrawn, processed through apheresis machine to separate and remove plasma, replaced with donor plasma or albumin, and returned to your body over 2-4 hours." },
        { title: "Recovery", desc: "Vital signs are monitored, vascular access is maintained if multiple sessions needed, and underlying condition is managed with additional treatments as needed." }
      ],
      duration: "2-4 hours per session",
      setting: "Hospital or specialized apheresis center",
      anesthesia: "None, though sedation available if needed"
    },
    benefits: {
      physical: ["Rapidly removes disease-causing substances from blood", "Can reverse life-threatening conditions", "Provides bridge to other therapies"],
      mental: ["Provides hope in severe illness", "Can dramatically improve function in responsive conditions", "Addresses crisis situations"],
      longTerm: ["May induce remission in certain autoimmune conditions", "Allows time for other treatments to work", "Can be repeated if disease recurs"],
      evidenceLevel: "High — well-established for specific conditions with clear indications based on clinical guidelines and evidence"
    },
    whoIsItFor: {
      goodCandidates: ["Those with specific diagnoses known to respond to plasmapheresis", "Patients with severe autoimmune crises", "Those failing other treatments", "Individuals able to tolerate procedure"],
      notSuitableFor: ["Those with poor vascular access", "People with hemodynamic instability", "Those with allergies to replacement fluids", "Conditions not shown to respond to plasmapheresis"],
      screeningRequired: "Confirmed diagnosis by specialist, assessment of vascular access, coagulation studies, type and screen for replacement products, and medical clearance for procedure."
    },
    results: {
      immediate: "Mild fatigue and potential electrolyte shifts during and immediately after procedure, with clinical improvement dependent on underlying condition.",
      shortTerm: "Improvement may be seen within days to weeks for responsive conditions as harmful substances are removed and underlying disease activity is controlled.",
      mediumTerm: "Multiple sessions (typically 5-7) over 1-2 weeks provide cumulative benefit, with stabilization or improvement in symptoms and laboratory markers.",
      longTerm: "Duration of benefit varies by condition, with some achieving sustained remission while others require maintenance treatments or develop recurrence needing repeat courses.",
      typicalPlan: "Initial course of 5-7 sessions over 1-2 weeks, with potential for maintenance therapy or repeat courses depending on condition and response."
    },
    safety: {
      commonEffects: ["Fatigue during and after treatment", "Low calcium symptoms (tingling, muscle cramps)", "Mild hypotension", "Vascular access discomfort"],
      rareRisks: ["Bleeding or clotting complications", "Allergic reactions to replacement products", "Infection at access site", "Severe hypotension or cardiac issues"],
      protocols: ["Performed at experienced medical center", "Continuous monitoring of vital signs", "Calcium supplementation as needed", "Sterile technique for vascular access", "Appropriate replacement fluid selection"]
    },
    faq: [
      { q: "Is plasma exchange the same as dialysis?", a: "No, while both process blood through machines, dialysis filters waste from blood in kidney failure while plasma exchange removes and replaces plasma to treat autoimmune and other conditions." },
      { q: "How many treatments will I need?", a: "Typical courses involve 5-7 sessions over 1-2 weeks, though this varies by condition, with some requiring maintenance treatments." },
      { q: "Will plasma exchange cure my condition?", a: "Plasma exchange is usually not a cure but a treatment to manage acute flares or severe symptoms while other therapies work or as part of ongoing management." },
      { q: "Will insurance cover plasma exchange?", a: "Coverage depends on your diagnosis, with most insurance covering established indications when medically necessary and properly documented." },
      { q: "What are the risks of donor plasma?", a: "Screened donor plasma carries minimal infection risk, though alternatives like albumin solutions can be used to avoid transfusion-related concerns." }
    ]
  },

  "NAD+ IV Injection": {
    heroValues: [
      { icon: "⏱️", text: "2-4 hour infusion" },
      { icon: "🎯", text: "Cellular energy boost" },
      { icon: "✨", text: "Emerging trend" }
    ],
    whatIsIt: {
      definition: "NAD+ (nicotinamide adenine dinucleotide) IV therapy involves intravenous infusion of this coenzyme to increase cellular levels, theoretically enhancing energy production and cellular repair.",
      purpose: "Proponents claim NAD+ infusions boost energy, improve mental clarity, support addiction recovery, and provide anti-aging benefits, though robust clinical evidence is limited.",
      howItWorks: "NAD+ is infused directly into the bloodstream over several hours, bypassing digestive absorption to deliver higher concentrations to cells where it participates in energy metabolism and DNA repair."
    },
    whyChoose: {
      goals: ["Boost cellular energy and metabolism", "Improve mental clarity and focus", "Support addiction recovery", "Promote anti-aging effects"],
      useCases: ["Chronic fatigue", "Brain fog or cognitive decline concerns", "Addiction recovery support", "Anti-aging and wellness optimization"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Discussion of symptoms and goals, medical history review, and explanation that this is an emerging therapy with limited clinical evidence." },
        { title: "Preparation", desc: "IV line is started, baseline vital signs are taken, and NAD+ solution is prepared at dosage determined by provider protocols." },
        { title: "Treatment", desc: "NAD+ is infused slowly over 2-4 hours to minimize side effects like nausea and chest tightness, with infusion rate adjusted based on tolerance." },
        { title: "Recovery", desc: "No downtime required, though some feel energized while others feel fatigued initially, with potential benefits reported over following days if effective." }
      ],
      duration: "2-4 hours per infusion",
      setting: "IV therapy clinic or wellness center",
      anesthesia: "None"
    },
    benefits: {
      physical: ["Theoretically boosts cellular energy", "May improve physical stamina", "Potentially supports cellular repair"],
      mental: ["Some report improved mental clarity", "Potential mood enhancement", "Claimed to reduce brain fog"],
      longTerm: ["Unknown long-term benefits", "May require ongoing treatments", "Theoretical anti-aging effects"],
      evidenceLevel: "Emerging — very limited clinical trial data, with most evidence being anecdotal or from small uncontrolled studies"
    },
    whoIsItFor: {
      goodCandidates: ["Adults seeking experimental wellness optimization", "Those with chronic fatigue seeking alternatives", "People understanding limited evidence", "Individuals able to afford out-of-pocket costs"],
      notSuitableFor: ["Those expecting proven medical treatment", "People with severe underlying medical conditions needing conventional care", "Pregnant or nursing women", "Those unable to tolerate slow infusions"],
      screeningRequired: "Basic medical history review to identify contraindications, though formal medical evaluation is often minimal at wellness clinics."
    },
    results: {
      immediate: "Some report feeling energized or relaxed during or immediately after infusion, though nausea or discomfort may occur if infused too rapidly.",
      shortTerm: "Reported benefits include improved energy and mental clarity over days following treatment, though placebo effects are possible and difficult to distinguish.",
      mediumTerm: "Effects are reported to diminish over weeks, leading providers to recommend regular infusions, though objective evidence of sustained benefits is lacking.",
      longTerm: "Long-term efficacy and safety are unknown due to lack of rigorous studies, with no data on whether regular treatments provide cumulative benefits.",
      typicalPlan: "Providers often recommend series of infusions (e.g., 4-10 sessions) followed by periodic maintenance, though protocols lack scientific standardization."
    },
    safety: {
      commonEffects: ["Nausea during infusion", "Chest tightness or pressure", "Flushing", "Fatigue or energy fluctuations after treatment"],
      rareRisks: ["Allergic reactions", "Vein irritation", "Electrolyte imbalances", "Unknown long-term safety profile"],
      protocols: ["Slow infusion rate to minimize side effects", "Monitoring during treatment", "Use of pharmaceutical-grade NAD+", "Informed consent about experimental nature"]
    },
    faq: [
      { q: "Does NAD+ IV really work?", a: "Clinical evidence is very limited, with most claims based on theory, animal studies, or anecdotal reports rather than rigorous human trials." },
      { q: "Is NAD+ IV safe?", a: "Short-term safety appears reasonable in healthy individuals, but long-term safety is unknown and infusions can cause uncomfortable side effects during administration." },
      { q: "How much does NAD+ IV cost?", a: "Treatments typically cost $400-$1000+ per session, entirely out-of-pocket as insurance doesn't cover experimental wellness therapies." },
      { q: "Can I just take NAD+ supplements orally?", a: "Oral NAD+ precursors like NR or NMN are available and much less expensive, though whether either oral or IV forms provide meaningful benefits remains unproven." },
      { q: "How often do I need NAD+ infusions?", a: "Providers recommend varying schedules from weekly to monthly maintenance, but no evidence-based guidelines exist for dosing or frequency." }
    ]
  },

  "Peptide Therapy": {
    heroValues: [
      { icon: "⏱️", text: "Self-injection daily" },
      { icon: "🎯", text: "Targeted signaling" },
      { icon: "✨", text: "Moderate evidence" }
    ],
    whatIsIt: {
      definition: "Peptide therapy involves using short chains of amino acids (peptides) that act as signaling molecules to influence various biological processes in the body.",
      purpose: "Different peptides target specific pathways for goals like muscle growth, fat loss, healing, immune function, or anti-aging, though evidence varies widely by peptide.",
      howItWorks: "Peptides are typically injected subcutaneously and travel through the bloodstream to bind specific receptors, triggering biological responses like growth hormone release or tissue repair."
    },
    whyChoose: {
      goals: ["Enhance muscle growth and recovery", "Support fat loss and metabolism", "Improve tissue healing", "Boost immune function or cognitive performance"],
      useCases: ["Athletic performance enhancement", "Age-related decline", "Injury recovery", "Body composition optimization"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Discussion of goals, medical history review, explanation of specific peptides recommended for your objectives, and informed consent about off-label use and variable evidence." },
        { title: "Preparation", desc: "Peptides are prescribed by a physician, often from compounding pharmacies, with instructions for reconstitution if provided in powder form and injection technique training." },
        { title: "Treatment", desc: "Self-administered subcutaneous injections are performed daily or as prescribed, typically in the abdomen or thigh, with dosing and timing varying by specific peptide." },
        { title: "Recovery", desc: "Ongoing monitoring of response through follow-up visits, lab work if applicable, and dose adjustments based on effects and tolerance." }
      ],
      duration: "Ongoing self-administration",
      setting: "Prescribed by physician, self-administered at home",
      anesthesia: "None"
    },
    benefits: {
      physical: ["May enhance muscle growth and recovery (some peptides)", "Potential fat loss support", "Possible improvement in healing"],
      mental: ["Some peptides claimed to improve cognitive function", "Potential mood benefits", "Sense of optimization and control"],
      longTerm: ["Effects require ongoing use for most peptides", "Long-term safety data limited", "Potential for customized protocols"],
      evidenceLevel: "Moderate to Emerging — varies significantly by peptide, with some having reasonable research support while others lack robust evidence"
    },
    whoIsItFor: {
      goodCandidates: ["Adults seeking performance or wellness optimization", "Those comfortable with daily injections", "People understanding off-label and experimental nature", "Individuals able to afford ongoing costs"],
      notSuitableFor: ["Those with certain cancers (some peptides may promote growth)", "Pregnant or nursing women", "People expecting guaranteed results", "Those unable to commit to protocols"],
      screeningRequired: "Medical consultation to determine appropriateness, baseline labs for some peptides, discussion of specific peptide evidence and risks."
    },
    results: {
      immediate: "No immediate effects, with most peptides requiring consistent use over weeks to months before potential benefits emerge.",
      shortTerm: "Depending on the peptide, effects like improved recovery, body composition changes, or enhanced wellbeing may appear over 4-12 weeks if effective.",
      mediumTerm: "Continued use over months may provide progressive benefits for responsive peptides, though individual responses vary considerably.",
      longTerm: "Long-term safety and efficacy are not well-established for most peptides, and benefits typically require ongoing use with unclear durability if stopped.",
      typicalPlan: "Protocols vary by peptide, with some used continuously, others cycled, and many lacking established evidence-based guidelines for dosing and duration."
    },
    safety: {
      commonEffects: ["Injection site reactions", "Water retention (some peptides)", "Increased appetite or changes in blood sugar", "Variable effects on hormones"],
      rareRisks: ["Tumor growth concerns with certain peptides", "Hormonal imbalances", "Unknown long-term safety profile", "Contamination risks from non-pharmaceutical sources"],
      protocols: ["Prescription from licensed physician", "Pharmaceutical-grade peptides from reputable sources", "Proper storage and reconstitution", "Monitoring through labs and follow-up"]
    },
    faq: [
      { q: "Are peptides legal?", a: "Many peptides exist in regulatory gray areas, being legal with prescription but not FDA-approved for most uses, making them off-label therapies." },
      { q: "Which peptide is best for me?", a: "This depends on your specific goals, with different peptides targeting different pathways, requiring individualized assessment by a knowledgeable provider." },
      { q: "Do peptides really work?", a: "Evidence varies dramatically by peptide, with some having research support while others rely largely on anecdotal reports or limited studies." },
      { q: "How much do peptides cost?", a: "Costs vary widely by peptide and source, typically $100-$500+ monthly, entirely out-of-pocket as insurance doesn't cover off-label wellness therapies." },
      { q: "Are peptides safer than steroids?", a: "While different mechanisms exist, both carry risks, and the notion that peptides are universally safe is misleading given limited long-term safety data." }
    ]
  },

  "Ozone Therapy": {
    heroValues: [
      { icon: "⏱️", text: "30-60 min session" },
      { icon: "🎯", text: "Oxidative treatment" },
      { icon: "✨", text: "Controversial" }
    ],
    whatIsIt: {
      definition: "Ozone therapy involves administering ozone gas (O3) into the body through various methods like blood treatment, injection, or insufflation, claimed to have therapeutic effects.",
      purpose: "Proponents claim ozone therapy treats infections, improves oxygenation, boosts immune function, and addresses numerous conditions, though scientific evidence is very limited and controversial.",
      howItWorks: "Ozone is typically mixed with blood (major or minor autohemotherapy), injected into joints, or insufflated into body cavities, where it theoretically creates oxidative stress that triggers biological responses."
    },
    whyChoose: {
      goals: ["Claimed immune system boost", "Purported improvement in oxygenation", "Alleged infection treatment", "Supposed anti-aging effects"],
      useCases: ["Chronic infections (claimed)", "Circulatory problems (claimed)", "Autoimmune conditions (claimed)", "General wellness optimization (claimed)"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Discussion of condition and goals, medical history, and explanation of ozone therapy methods, though evidence discussion is often inadequate at ozone therapy clinics." },
        { title: "Preparation", desc: "For blood ozone therapy, vein access is established, while other methods require positioning for injection or insufflation of ozone gas." },
        { title: "Treatment", desc: "Blood is withdrawn and mixed with ozone before reinfusion (autohemotherapy), or ozone is injected directly into tissues or insufflated into body cavities like rectum or vagina." },
        { title: "Recovery", desc: "Minimal immediate recovery though some report feeling energized or fatigued, with multiple sessions typically recommended by practitioners." }
      ],
      duration: "30-60 minutes per session",
      setting: "Alternative medicine or ozone therapy clinic",
      anesthesia: "None"
    },
    benefits: {
      physical: ["Claims of improved oxygenation and circulation (unproven)", "Purported immune enhancement (minimal evidence)", "Alleged anti-microbial effects"],
      mental: ["Placebo effects and sense of doing something for health", "Reported energy improvements (likely subjective)"],
      longTerm: ["Unknown and unproven long-term benefits", "Requires ongoing treatments per practitioners", "May delay conventional evidence-based care"],
      evidenceLevel: "Emerging — very limited high-quality evidence, with most claims not supported by rigorous studies and some safety concerns"
    },
    whoIsItFor: {
      goodCandidates: ["Those seeking alternative therapies with understanding of limited evidence", "People who have realistic expectations", "Individuals willing to pay out-of-pocket", "Those not forgoing conventional treatment"],
      notSuitableFor: ["Those expecting proven medical treatment", "People with G6PD deficiency (ozone contraindicated)", "Those with active hyperthyroidism", "Individuals relying on this instead of evidence-based care"],
      screeningRequired: "Medical history should be reviewed to identify contraindications like G6PD deficiency, though screening rigor varies widely between providers."
    },
    results: {
      immediate: "Some report feeling energized or experiencing mild detox reactions, though these are subjective and may represent placebo effects.",
      shortTerm: "Claimed benefits like improved energy or reduced symptoms over weeks are difficult to objectively verify and often conflate correlation with causation.",
      mediumTerm: "Long-term outcomes are not well-documented in quality studies, with anecdotal reports being the primary source of claimed benefits.",
      longTerm: "No robust evidence demonstrates long-term health benefits, and potential risks of repeated treatments remain unclear.",
      typicalPlan: "Providers typically recommend series of 6-10 or more treatments, often suggesting maintenance sessions, without evidence-based protocols."
    },
    safety: {
      commonEffects: ["Mild discomfort at injection sites", "Herxheimer-like reactions (claimed detox symptoms)", "Temporary fatigue or energy changes"],
      rareRisks: ["Air embolism if improperly administered", "Oxidative damage with excessive treatment", "Hemolysis in G6PD deficiency", "Unknown long-term effects of repeated oxidative stress"],
      protocols: ["Should only be performed by trained practitioners", "Screening for G6PD deficiency essential", "Sterile technique required", "Informed consent about controversial nature"]
    },
    faq: [
      { q: "Does ozone therapy really work?", a: "High-quality scientific evidence for most claimed benefits is lacking, with many claims based on poor-quality studies, theory, or anecdotes." },
      { q: "Is ozone therapy safe?", a: "While serious adverse events are uncommon when properly administered, the treatment involves intentional oxidative stress with unknown long-term consequences." },
      { q: "Why isn't ozone therapy more widely accepted?", a: "Lack of rigorous scientific evidence, safety concerns, and skepticism from mainstream medicine due to inadequate research quality have limited acceptance." },
      { q: "Can ozone therapy treat COVID or other infections?", a: "Claims about treating specific infections lack adequate scientific support and may provide false hope while delaying appropriate medical care." },
      { q: "How much does ozone therapy cost?", a: "Sessions typically cost $100-$300 or more, entirely out-of-pocket, with providers recommending multiple treatments adding to expense." }
    ]
  },

  "Hyperbaric Oxygen Therapy": {
    heroValues: [
      { icon: "⏱️", text: "60-120 min session" },
      { icon: "🎯", text: "High-pressure oxygen" },
      { icon: "✨", text: "Proven for some uses" }
    ],
    whatIsIt: {
      definition: "Hyperbaric Oxygen Therapy (HBOT) involves breathing pure oxygen in a pressurized chamber, increasing oxygen delivery to tissues far beyond normal atmospheric levels.",
      purpose: "HBOT has proven medical uses like treating decompression sickness, non-healing wounds, and carbon monoxide poisoning, but is also marketed for many unproven applications.",
      howItWorks: "In a sealed chamber pressurized to 1.5-3 times atmospheric pressure, pure oxygen is breathed, dramatically increasing dissolved oxygen in blood and tissues to promote healing."
    },
    whyChoose: {
      goals: ["Treat proven medical conditions (wound healing, decompression sickness)", "Enhance tissue oxygenation", "Support healing in certain conditions", "Claimed benefits for numerous unproven uses"],
      useCases: ["Non-healing diabetic foot ulcers", "Radiation tissue injury", "Decompression sickness", "Carbon monoxide poisoning", "Many unproven applications (TBI, autism, anti-aging)"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Medical evaluation to determine if condition has proven benefit from HBOT, ear/sinus assessment for pressure tolerance, and discussion of realistic expectations." },
        { title: "Preparation", desc: "Remove items that could be fire hazards in pure oxygen environment, receive instruction on pressure equalization techniques for ears, and change into appropriate clothing." },
        { title: "Treatment", desc: "Enter chamber (individual or multiplace), chamber is sealed and gradually pressurized while breathing pure oxygen for 60-120 minutes, then slowly decompressed." },
        { title: "Recovery", desc: "No significant recovery time needed, though ear pressure symptoms may linger briefly, with multiple sessions typically required per treatment protocol." }
      ],
      duration: "60-120 minutes per session",
      setting: "Hospital hyperbaric unit or specialized HBOT center",
      anesthesia: "None"
    },
    benefits: {
      physical: ["Accelerates healing of specific wounds", "Treats decompression sickness", "Reduces radiation tissue damage", "Increases tissue oxygen for proven indications"],
      mental: ["Provides evidence-based treatment for certain conditions", "Peace of mind when used appropriately", "Claims for neurological conditions largely unproven"],
      longTerm: ["Effective for established indications with proper protocols", "May prevent amputation in diabetic foot ulcers", "Unproven for many marketed longevity and performance claims"],
      evidenceLevel: "High for established indications, Emerging to Low for many off-label uses — clear distinction needed between proven and unproven applications"
    },
    whoIsItFor: {
      goodCandidates: ["Those with established indications (wound healing, decompression sickness, radiation injury, etc.)", "People able to equalize ear pressure", "Those committed to multiple sessions", "Individuals with insurance coverage for proven uses"],
      notSuitableFor: ["Those with untreated pneumothorax (collapsed lung)", "People with certain lung conditions", "Those unable to equalize ear pressure", "Individuals with claustrophobia (individual chambers)"],
      screeningRequired: "Medical evaluation to confirm appropriate indication, chest X-ray if lung disease suspected, ear/sinus examination, and smoking cessation if applicable."
    },
    results: {
      immediate: "No immediate dramatic changes, though tissues are being oxygenated during treatment, with therapeutic effects accumulating over multiple sessions.",
      shortTerm: "For proven indications like wound healing, gradual improvement occurs over weeks of regular treatments (typically 20-40 sessions).",
      mediumTerm: "Continued progress in wound healing or tissue recovery with complete protocol, with some conditions requiring maintenance treatments.",
      longTerm: "For established uses, benefits can be substantial and lasting (wound closure, tissue preservation), while unproven uses lack long-term efficacy data.",
      typicalPlan: "Protocols for proven indications typically involve 20-40 daily sessions, while wellness centers may recommend varying schedules for unproven uses."
    },
    safety: {
      commonEffects: ["Ear pressure and barotrauma if unable to equalize", "Temporary vision changes", "Claustrophobia in individual chambers", "Fatigue"],
      rareRisks: ["Oxygen toxicity with excessive exposure", "Pneumothorax worsening", "Seizures (very rare)", "Fire risk if safety protocols violated"],
      protocols: ["Screening for contraindications", "Gradual pressurization and depressurization", "Strict safety protocols regarding fire hazards", "Medical supervision", "Ear equalization training"]
    },
    faq: [
      { q: "What conditions does HBOT actually treat?", a: "FDA and insurance-recognized indications include decompression sickness, non-healing wounds, radiation tissue injury, carbon monoxide poisoning, and several other specific conditions." },
      { q: "Does HBOT help with autism, brain injury, or anti-aging?", a: "Evidence for these and many other marketed uses is limited or absent, with claims often exceeding scientific support." },
      { q: "Is HBOT covered by insurance?", a: "Insurance covers established medical indications when properly documented, but not off-label or wellness uses which can be very expensive." },
      { q: "How many treatments do I need?", a: "For proven indications, protocols typically involve 20-40 daily sessions, while unproven uses have no established evidence-based protocols." },
      { q: "Are home HBOT chambers effective?", a: "Home units operate at lower pressures than medical chambers and lack the pure oxygen of clinical systems, with questionable efficacy for any indication." }
    ]
  },

  "Biochip Implantation": {
    heroValues: [
      { icon: "⏱️", text: "15-30 min procedure" },
      { icon: "🎯", text: "Subcutaneous technology" },
      { icon: "✨", text: "Emerging field" }
    ],
    whatIsIt: {
      definition: "Biochip implantation involves inserting small microchips subcutaneously, typically in the hand, for purposes like contactless payment, access control, or data storage.",
      purpose: "These RFID or NFC chips provide convenience for unlocking doors, making payments, storing medical information, or identifying oneself without external devices.",
      howItWorks: "A small biocompatible chip encased in glass is injected under the skin using a large-bore needle, where it remains dormant until activated by proximity to a compatible reader."
    },
    whyChoose: {
      goals: ["Convenience for access control and payments", "Store medical or identification data", "Eliminate need for keys or cards", "Explore human augmentation"],
      useCases: ["Building or vehicle access", "Contactless payment", "Medical information storage", "Personal identification"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Discussion of chip type (RFID vs NFC), placement location (usually hand between thumb and index finger), compatibility with intended readers, and informed consent about limitations and risks." },
        { title: "Preparation", desc: "Injection site is cleaned and sterilized, local anesthetic may be applied, and chip is loaded into specialized injection device." },
        { title: "Treatment", desc: "Using a large-bore needle, the chip is injected subcutaneously in chosen location, device is withdrawn, and site is covered with bandage." },
        { title: "Recovery", desc: "Mild soreness for a few days, avoid heavy use of hand during healing, and chip typically becomes functional immediately once swelling subsides." }
      ],
      duration: "15-30 minutes",
      setting: "Body modification studio or specialized clinic",
      anesthesia: "Local anesthetic or none"
    },
    benefits: {
      physical: ["Hands-free access and payment", "Permanent placement eliminates losing cards/keys", "Biocompatible materials well-tolerated"],
      mental: ["Convenience and futuristic appeal", "Sense of being an early adopter", "Reduced anxiety about forgetting keys or wallet"],
      longTerm: ["Chips can last many years", "Can potentially be removed if desired", "Technology may become more widely compatible"],
      evidenceLevel: "Emerging — established safety of implant materials but limited long-term data on biochips specifically, with evolving technology and applications"
    },
    whoIsItFor: {
      goodCandidates: ["Adults interested in biohacking or convenience", "Those with compatible systems (locks, payment terminals)", "People comfortable with body modification", "Individuals understanding limitations and risks"],
      notSuitableFor: ["Those requiring MRI frequently (may need removal)", "People with compromised immune systems", "Individuals uncomfortable with implanted technology", "Those expecting chip to work everywhere"],
      screeningRequired: "Minimal medical screening typically performed, though discussion of MRI compatibility, infection risk, and realistic expectations about technology limitations is important."
    },
    results: {
      immediate: "Chip is implanted with some pain and swelling, though it can often be tested for function immediately to confirm proper placement.",
      shortTerm: "Healing occurs over 1-2 weeks with mild soreness and swelling resolving, and chip becomes comfortable and imperceptible in daily life.",
      mediumTerm: "Chip functions indefinitely for compatible readers, though not all systems accept implanted chips due to security or policy restrictions.",
      longTerm: "Chips can last many years or indefinitely, though technology evolution may render older chips obsolete as new standards emerge.",
      typicalPlan: "One-time implantation with no maintenance required, though removal or replacement possible if chip fails or newer technology desired."
    },
    safety: {
      commonEffects: ["Pain and swelling at implantation site", "Bruising", "Temporary discomfort with hand use"],
      rareRisks: ["Infection requiring antibiotics or removal", "Chip migration", "Rejection or granuloma formation", "MRI incompatibility"],
      protocols: ["Sterile technique essential", "Use of biocompatible medical-grade chips", "Proper placement depth and location", "Post-implant care instructions"]
    },
    faq: [
      { q: "Does biochip implantation hurt?", a: "The injection is painful as it uses a large needle, though brief, with soreness lasting a few days similar to a minor injury." },
      { q: "Can the chip be tracked or hacked?", a: "Current chips are passive RFID/NFC requiring very close proximity to read, not GPS-tracked, though security depends on encryption and reader security." },
      { q: "Will it work everywhere?", a: "No, compatibility is limited to systems designed to accept the chip's technology, with many commercial readers rejecting implanted chips for policy reasons." },
      { q: "Can I have an MRI with a chip implant?", a: "Some chips may be MRI-compatible but others are not, and removal may be necessary, so this should be discussed before implantation." },
      { q: "How do I remove the chip if I want it out?", a: "A small incision allows chip removal, typically requiring local anesthetic and leaving a small scar, though the procedure is straightforward." }
    ]
  },

  "Advanced Health Screening": {
    heroValues: [
      { icon: "⏱️", text: "Half to full day" },
      { icon: "🎯", text: "Comprehensive evaluation" },
      { icon: "✨", text: "Preventive focus" }
    ],
    whatIsIt: {
      definition: "Advanced health screening involves comprehensive medical evaluation with extensive testing beyond routine checkups, often including imaging, specialized labs, and genetic analysis.",
      purpose: "These programs aim to detect diseases at early, treatable stages, assess health risks, and provide personalized recommendations for prevention and optimization.",
      howItWorks: "A series of tests and evaluations are performed in one or more visits, including imaging (MRI, CT, ultrasound), blood work, cardiac assessment, cancer screening, and consultations with specialists."
    },
    whyChoose: {
      goals: ["Detect diseases at early, treatable stages", "Assess comprehensive health status", "Identify risk factors for prevention", "Establish health baseline for future comparison"],
      useCases: ["Health-conscious individuals seeking comprehensive evaluation", "Those with family history of certain diseases", "Executive health programs", "Preventive care beyond routine screening"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Pre-screening questionnaire about medical history, family history, lifestyle, and health concerns determines which tests are most appropriate for you." },
        { title: "Preparation", desc: "Pre-test instructions may include fasting, medication adjustments, and scheduling logistics for completing multiple tests in one or more days." },
        { title: "Treatment", desc: "Battery of tests performed including bloodwork, imaging (MRI, CT, ultrasound), cardiac stress test, pulmonary function, colonoscopy if indicated, and other specialized assessments." },
        { title: "Recovery", desc: "Results are compiled and reviewed by physicians who provide comprehensive report with findings, risk assessment, and personalized recommendations." }
      ],
      duration: "Half day to full day or multiple visits",
      setting: "Specialized health screening center or hospital",
      anesthesia: "Varies by specific tests included"
    },
    benefits: {
      physical: ["Early detection of diseases like cancer or heart disease", "Comprehensive assessment of organ function", "Identification of treatable risk factors"],
      mental: ["Peace of mind from thorough evaluation", "Empowerment through health knowledge", "Reduced anxiety about undetected conditions"],
      longTerm: ["Establishes baseline for future comparison", "Enables early intervention preventing disease progression", "Personalized prevention strategies"],
      evidenceLevel: "Moderate — value varies by individual risk factors, with clear benefits for some tests while others may provide marginal benefit or false positives"
    },
    whoIsItFor: {
      goodCandidates: ["Adults at higher risk due to age or family history", "Health-conscious individuals seeking comprehensive evaluation", "Those with means to afford extensive testing", "People willing to act on findings"],
      notSuitableFor: ["Those who won't follow up on abnormal findings", "People with severe anxiety about medical testing", "Young, low-risk individuals (limited yield)", "Those expecting all tests to be beneficial"],
      screeningRequired: "Pre-screening questionnaire to customize testing panel based on age, gender, family history, and specific health concerns."
    },
    results: {
      immediate: "Most tests are completed in one day, though results from pathology, genetics, and some specialized tests take days to weeks to return.",
      shortTerm: "Comprehensive report is provided within 1-2 weeks detailing all findings, abnormalities requiring follow-up, and risk factor assessment.",
      mediumTerm: "Action items from screening (lifestyle changes, follow-up testing, specialist referrals) are pursued over following months.",
      longTerm: "Screening establishes health baseline for comparison, with periodic repeat screening (typically annually or every few years) to monitor changes.",
      typicalPlan: "One comprehensive screening session with follow-up as needed for any findings, and repeat comprehensive screening at recommended intervals."
    },
    safety: {
      commonEffects: ["Fatigue from full day of testing", "Anxiety waiting for results", "Discomfort from specific tests (blood draws, imaging, etc.)"],
      rareRisks: ["False positive results causing unnecessary anxiety and follow-up", "Radiation exposure from CT scans", "Incidental findings of unclear significance", "Overdiagnosis and overtreatment"],
      protocols: ["Evidence-based test selection appropriate for age and risk", "High-quality imaging and laboratory services", "Physician review and interpretation of results", "Appropriate follow-up recommendations"]
    },
    faq: [
      { q: "Is advanced screening worth the cost?", a: "Value depends on your risk factors, with higher-risk individuals more likely to benefit while low-risk young people may gain little for the expense." },
      { q: "Will insurance cover advanced screening?", a: "Most comprehensive screening programs are not covered by insurance as they exceed recommended guidelines, making them significant out-of-pocket expenses." },
      { q: "How often should I get screened?", a: "Recommendations vary, with many programs suggesting annual or biennial screening, though frequency should be individualized based on findings and risk factors." },
      { q: "What if they find something wrong?", a: "The program should provide clear follow-up recommendations and referrals to specialists for any abnormalities requiring further evaluation or treatment." },
      { q: "Can't I just get these tests from my regular doctor?", a: "Many tests can be ordered individually, but comprehensive programs offer convenience and coordinated interpretation, though appropriate screening may be available through regular care." }
    ]
  },

  "Testosterone Replacement Therapy": {
    heroValues: [
      { icon: "⏱️", text: "Ongoing treatment" },
      { icon: "🎯", text: "Hormone optimization" },
      { icon: "✨", text: "Medically indicated" }
    ],
    whatIsIt: {
      definition: "Testosterone Replacement Therapy (TRT) involves supplementing testosterone in men with clinically low levels (hypogonadism) through injections, gels, patches, or pellets.",
      purpose: "TRT treats symptoms of low testosterone including fatigue, reduced libido, erectile dysfunction, decreased muscle mass, and mood changes when levels are medically deficient.",
      howItWorks: "Exogenous testosterone is delivered through various methods to restore blood levels to normal physiological range, relieving symptoms while requiring monitoring for side effects."
    },
    whyChoose: {
      goals: ["Restore testosterone to normal levels", "Improve energy and libido", "Increase muscle mass and strength", "Enhance mood and cognitive function"],
      useCases: ["Clinically diagnosed hypogonadism (low testosterone)", "Age-related testosterone decline with symptoms", "Testosterone deficiency from medical conditions", "Pituitary or testicular disorders"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive evaluation including symptom assessment, physical exam, and morning blood tests to confirm low testosterone on at least two occasions before treatment." },
        { title: "Preparation", desc: "Discussion of delivery methods (injections, gels, patches, pellets), risks and benefits, monitoring requirements, and realistic expectations about outcomes." },
        { title: "Treatment", desc: "TRT is initiated with chosen delivery method, starting at conservative dose with plan to adjust based on blood levels and symptom response." },
        { title: "Recovery", desc: "Ongoing monitoring through regular blood tests, physical exams, and symptom assessment, with dose adjustments to maintain testosterone in therapeutic range." }
      ],
      duration: "Lifelong treatment typically",
      setting: "Prescribed by physician, often self-administered",
      anesthesia: "None"
    },
    benefits: {
      physical: ["Increased energy and reduced fatigue", "Improved libido and sexual function", "Increased muscle mass and strength", "Reduced body fat"],
      mental: ["Improved mood and reduced depression", "Better cognitive function", "Enhanced motivation and sense of wellbeing"],
      longTerm: ["Sustained symptom relief with ongoing treatment", "Potential cardiovascular and bone health benefits when appropriately used", "Improved quality of life"],
      evidenceLevel: "High for treating clinically diagnosed hypogonadism, Moderate for age-related decline — clear benefit when properly indicated but potential for inappropriate use"
    },
    whoIsItFor: {
      goodCandidates: ["Men with confirmed low testosterone and symptoms", "Those with hypogonadism from medical conditions", "Men willing to commit to monitoring and treatment", "Those understanding risks and limitations"],
      notSuitableFor: ["Men with prostate or breast cancer", "Those with untreated sleep apnea", "Men with high red blood cell counts", "Those seeking performance enhancement without deficiency"],
      screeningRequired: "Morning testosterone levels on at least two occasions, complete blood count, prostate screening, and comprehensive medical evaluation to identify contraindications."
    },
    results: {
      immediate: "No immediate effects, with testosterone levels beginning to rise within days depending on delivery method.",
      shortTerm: "Energy and mood improvements may appear within 3-6 weeks, while sexual function, body composition, and strength changes take 3-6 months.",
      mediumTerm: "Full benefits emerge over 6-12 months with optimized dosing, including improvements in muscle mass, fat distribution, and quality of life measures.",
      longTerm: "Benefits require continuous treatment as testosterone production doesn't recover, with lifelong therapy needed for sustained symptom relief.",
      typicalPlan: "Ongoing treatment with regular monitoring (blood tests every 3-6 months initially, then less frequently) and dose adjustments to maintain therapeutic levels."
    },
    safety: {
      commonEffects: ["Acne or oily skin", "Increased red blood cell count", "Testicular shrinkage", "Reduced fertility"],
      rareRisks: ["Cardiovascular events (risk debated)", "Prostate growth", "Sleep apnea worsening", "Liver toxicity (oral forms)"],
      protocols: ["Confirmation of diagnosis before treatment", "Regular monitoring of testosterone, hematocrit, PSA", "Cardiovascular risk assessment", "Appropriate patient selection and education"]
    },
    faq: [
      { q: "Will TRT make me more muscular?", a: "TRT restores normal levels, which can improve muscle mass and strength, but effects are modest compared to supraphysiologic doses and depend on exercise." },
      { q: "Does TRT cause prostate cancer?", a: "Current evidence suggests TRT doesn't cause prostate cancer but may accelerate existing cancer, which is why screening is essential before and during treatment." },
      { q: "Can I stop TRT once I start?", a: "Yes, but symptoms will return as natural production doesn't recover in most cases, and stopping may temporarily worsen symptoms below pre-treatment levels." },
      { q: "Will TRT improve my fertility?", a: "No, TRT typically reduces fertility by suppressing natural testosterone and sperm production, requiring alternative treatments if fertility is a concern." },
      { q: "How do I know if I need TRT?", a: "Clinical diagnosis requires both low testosterone levels on morning blood tests AND symptoms consistent with deficiency, not just low numbers or symptoms alone." }
    ]
  },

  "Human Growth Hormone": {
    heroValues: [
      { icon: "⏱️", text: "Daily injections" },
      { icon: "🎯", text: "Hormone replacement" },
      { icon: "✨", text: "Strictly regulated" }
    ],
    whatIsIt: {
      definition: "Human Growth Hormone (HGH) therapy involves injecting synthetic growth hormone to treat deficiency states, though it's often sought inappropriately for anti-aging or performance enhancement.",
      purpose: "Legitimate medical uses treat growth hormone deficiency in children and adults, while off-label use for anti-aging or athletics is controversial and often illegal.",
      howItWorks: "Recombinant growth hormone is injected subcutaneously, typically daily, to replace deficient endogenous production and normalize IGF-1 levels under medical supervision."
    },
    whyChoose: {
      goals: ["Treat diagnosed growth hormone deficiency", "Improve growth in children with deficiency", "Address symptoms of adult GH deficiency", "Controversial use for anti-aging or performance"],
      useCases: ["Childhood growth hormone deficiency", "Adult growth hormone deficiency from pituitary disease", "Short stature syndromes (Turner, Prader-Willi)", "Off-label: anti-aging (controversial and often inappropriate)"]
    },
    howItWorks: {
      steps: [
        { title: "Consultation", desc: "Comprehensive endocrine evaluation including stimulation testing to confirm growth hormone deficiency, as HGH should not be prescribed without confirmed deficiency." },
        { title: "Preparation", desc: "Education on injection technique, proper storage and handling of HGH, monitoring requirements, and realistic expectations about benefits and risks." },
        { title: "Treatment", desc: "Daily subcutaneous injections of recombinant human growth hormone, typically in the evening, with dosing based on weight and IGF-1 response." },
        { title: "Recovery", desc: "Ongoing monitoring through regular blood tests (IGF-1 levels), assessment of symptoms and side effects, and dose adjustments to maintain appropriate response." }
      ],
      duration: "Long-term to lifelong treatment",
      setting: "Prescribed by endocrinologist, self-administered at home",
      anesthesia: "None"
    },
    benefits: {
      physical: ["Normalized growth in deficient children", "Improved body composition (increased muscle, decreased fat)", "Increased bone density", "Improved exercise capacity in true deficiency"],
      mental: ["Improved quality of life in deficient adults", "Enhanced energy and wellbeing when appropriately used", "Psychological benefits of normalized growth in children"],
      longTerm: ["Sustained benefits require ongoing treatment", "Long-term safety established for true deficiency states", "Unknown risks of inappropriate use for anti-aging"],
      evidenceLevel: "High for treating confirmed deficiency, Low to Controversial for anti-aging — clear benefit when medically indicated but harmful when misused"
    },
    whoIsItFor: {
      goodCandidates: ["Children with confirmed growth hormone deficiency", "Adults with pituitary disease causing GH deficiency", "Certain genetic syndromes affecting growth", "Those with documented deficiency through stimulation testing"],
      notSuitableFor: ["People seeking anti-aging without deficiency", "Those with active cancer", "Individuals with diabetic retinopathy", "Athletes seeking performance enhancement (illegal)"],
      screeningRequired: "Comprehensive endocrine evaluation with stimulation testing, pituitary imaging if indicated, screening for contraindications, and confirmation of deficiency before treatment."
    },
    results: {
      immediate: "No immediate effects, with metabolic changes beginning within weeks but clinical effects taking months.",
      shortTerm: "Body composition changes (reduced fat, increased muscle) emerge over 3-6 months, along with improved energy in deficient adults.",
      mediumTerm: "Full benefits in body composition, bone density, and quality of life measures develop over 6-12 months of treatment.",
      longTerm: "Ongoing treatment required to maintain benefits, as effects reverse if treatment is discontinued, with long-term safety in deficiency states established.",
      typicalPlan: "Lifelong treatment for most adult-onset deficiency, or until final height achieved in children, with regular monitoring of IGF-1 and clinical response."
    },
    safety: {
      commonEffects: ["Fluid retention and edema", "Joint pain and stiffness", "Carpal tunnel syndrome", "Insulin resistance"],
      rareRisks: ["Increased cancer risk (theoretical, debated)", "Intracranial hypertension", "Slipped capital femoral epiphysis in children", "Diabetes development or worsening"],
      protocols: ["Treatment only for confirmed deficiency by endocrinologist", "Regular IGF-1 monitoring to avoid excess", "Screening for contraindications and complications", "Cancer surveillance in high-risk individuals"]
    },
    faq: [
      { q: "Can HGH reverse aging?", a: "While marketed for anti-aging, evidence doesn't support HGH as an anti-aging therapy, and use without deficiency carries risks without proven benefits." },
      { q: "Is HGH legal?", a: "HGH is legal only by prescription for FDA-approved indications (confirmed deficiency, certain syndromes), with off-label anti-aging or athletic use being illegal." },
      { q: "Does HGH cause cancer?", a: "This is debated, with theoretical concerns about cancer promotion but without definitive evidence in properly indicated use for deficiency." },
      { q: "How do I know if I'm deficient?", a: "True deficiency requires stimulation testing by an endocrinologist, not just low IGF-1 or symptoms, as many anti-aging clinics diagnose inappropriately." },
      { q: "Why is HGH so expensive?", a: "Recombinant HGH is complex to manufacture and typically costs $1000-$5000+ monthly, covered by insurance for approved indications but not for off-label use." }
    ]
  }
};
