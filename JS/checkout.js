
(function () {
  // --- CONFIG ---
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyokOceeMG8d9qoenAOc75lsctFYZss_003XxO-iToUI_Atry16yKU_u-xA2USIXsiUNQ/exec";

  // --- DATA (district -> upazila) ---
    const data = {
        "বাগেরহাট": ["বাগেরহাট সদর", "চিতলমারী", "ফকিরহাট", "কচুয়া", "মোল্লাহাট", "মোংলা", "মোড়েলগঞ্জ", "রামপাল", "শরণখোলা"],
        "বান্দরবান": ["আলীকদম", "বান্দরবান সদর", "লামা", "নাইক্ষ্যংছড়ি", "রোয়াংছড়ি", "রুমা", "থানচি"],
        "বরগুনা": ["আমতলী", "বরগুনা সদর", "বেতাগী", "বামনা", "পাথরঘাটা", "তালতলী"],
        "বরিশাল": ["আগৈলঝাড়া", "বাবুগঞ্জ", "বাকেরগঞ্জ", "বানারীপাড়া", "বরিশাল সদর", "গৌরনদী", "হিজলা", "মেহেন্দিগঞ্জ", "মুলাদী", "উজিরপুর"],
        "ভোলা": ["ভোলা সদর", "বোরহানউদ্দিন", "চরফ্যাশন", "দৌলতখান", "লালমোহন", "মনপুরা", "তজুমুদ্দিন"],
        "বগুড়া": ["আদমদিঘী", "বগুড়া সদর", "ধুনট", "দুপচাঁচিয়া", "গাবতলী", "কাহালু", "নন্দিগ্রাম", "সারিয়াকান্দি", "শাজাহানপুর", "শেরপুর", "শিবগঞ্জ", "সোনাতলা"],
        "ব্রাহ্মণবাড়িয়া": ["আখাউড়া", "আশুগঞ্জ", "ব্রাহ্মণবাড়িয়া সদর", "বাঞ্ছারামপুর", "কসবা", "নবীনগর", "নাসিরনগর", "সরাইল", "বিজয়নগর"],
        "চাঁদপুর": ["চাঁদপুর সদর", "ফরিদগঞ্জ", "হাইমচর", "হাজীগঞ্জ", "কচুয়া", "মতলব দক্ষিণ", "মতলব উত্তর", "শাহরাস্তি"],
        "চাঁপাইনবাবগঞ্জ": ["ভোলাহাট", "গোমস্তাপুর", "নাচোল", "নবাবগঞ্জ সদর", "শিবগঞ্জ"],
        "চট্টগ্রাম": ["আনোয়ারা", "বাঁশখালী", "বোয়ালখালী", "চন্দনাইশ", "ফটিকছড়ি", "হাটহাজারী", "লোহাগাড়া", "মীরসরাই", "পটিয়া", "রাঙ্গুনিয়া", "রাউজান", "সন্দ্বীপ", "সাতকানিয়া", "সীতাকুণ্ড", "চট্টগ্রাম সদর", "কর্ণফুলি"],
        "কক্সবাজার": ["কক্সবাজার সদর", "টেকনাফ", "উখিয়া", "রামু", "মহেশখালী", "চকরিয়া", "পেকুয়া", "কুতুবদিয়া"],
        "চুয়াডাঙ্গা": ["আলমডাঙ্গা", "চুয়াডাঙ্গা সদর", "দামুরহুদা", "জীবননগর"],
        "কুমিল্লা": ["বরুরা", "ব্রাহ্মণপাড়া", "বুড়িচং", "চান্দিনা", "চৌদ্দগ্রাম", "দাউদকান্দি", "দেবিদ্বার", "হোমনা", "লাকসাম", "মুরাদনগর", "নাঙ্গলকোট", "তিতাস", "মেঘনা", "মনোহরগঞ্জ", "কুমিল্লা আদর্শ সদর", "কুমিল্লা সদর দক্ষিণ"],
        "ঢাকা": ["ধামরাই", "দোহার", "কেরানীগঞ্জ", "নবাবগঞ্জ", "সাভার", "তেজগাঁও", "রমনা", "ধানমন্ডি", "উত্তরা", "মোহাম্মদপুর", "পল্টন", "মিরপুর", "গুলশান", "বাড্ডা"],
        "দিনাজপুর": ["বীরগঞ্জ", "বীরগঞ্জ", "বোচাগঞ্জ", "চিরিরবন্দর", "দিনাজপুর সদর", "ঘোড়াঘাট", "হাকিমপুর", "কাহারোল", "খানসামা", "নবাবগঞ্জ", "পার্বতীপুর", "ফুলবাড়ী", "বিরল"],
        "ফরিদপুর": ["আলফাডাঙ্গা", "ভাঙ্গা", "বোয়ালমারী", "চরভদ্রাসন", "ফরিদপুর সদর", "মধুখালী", "নগরকান্দা", "সদরপুর", "সালথা"],
        "ফেনী": ["ছাগলনাইয়া", "দাগনভূঞা", "ফেনী সদর", "পরশুরাম", "সোনাগাজী", "ফুলগাজী"],
        "গাইবান্ধা": ["ফুলছড়ি", "গাইবান্ধা সদর", "গোবিন্দগঞ্জ", "পলাশবাড়ী", "সাদুল্লাপুর", "সাঘাটা"],
        "গাজীপুর": ["গাজীপুর সদর", "কালিয়াকৈর", "কালীগঞ্জ", "কাপাসিয়া", "শ্রীপুর"],
        "গোপালগঞ্জ": ["গোপালগঞ্জ সদর", "কাশিয়ানী", "কোটালীপাড়া", "মাকসুদপুর", "টুঙ্গিপাড়া"],
        "হবিগঞ্জ": ["আজমিরীগঞ্জ", "বাহুবল", "বানিয়াচং", "চুনারুঘাট", "হবিগঞ্জ সদর", "লাখাই", "মাধবপুর", "নবীগঞ্জ", "শায়েস্তাগঞ্জ"],
        "জামালপুর": ["বকশীগঞ্জ", "দেওয়ানগঞ্জ", "ইসলামপুর", "জামালপুর সদর", "মাদারগঞ্জ", "মেলান্দহ", "সরিষাবাড়ী"],
        "যশোর": ["অভয়নগর", "বাঘারপাড়া", "চৌগাছা", "যশোর সদর", "ঝিকরগাছা", "কেশবপুর", "মণিরামপুর", "শার্শা"],
        "ঝালকাঠি": ["ঝালকাঠি সদর", "কাঠালিয়া", "নলছিটি", "রাজাপুর"],
        "ঝিনাইদহ": ["হরিণাকুন্ডু", "ঝিনাইদহ সদর", "কালীগঞ্জ", "কোটচাঁদপুর", "মহেশপুর", "শৈলকূপা"],
        "জয়পুরহাট": ["আক্কেলপুর", "জয়পুরহাট সদর", "কালাই", "খেতলাল", "পাঁচবিবি"],
        "খাগড়াছড়ি": ["দিঘীনালা", "খাগড়াছড়ি সদর", "লক্ষীছড়ি", "মহালছড়ি", "মানিকছড়ি", "মাটিরাঙ্গা", "পানছড়ি", "রামগড়"],
        "খুলনা": ["বটিয়াঘাটা", "ডাকোপ", "দৌলতপুর", "দিঘলিয়া", "ডুমুরিয়া", "খালিশপুর", "খান জাহান আলী", "খুলনা সদর", "কয়রা", "পাইকগাছা", "ফুলতলা", "রূপসা", "তেরখাদা"],
        "কিশোরগঞ্জ": ["অষ্টগ্রাম", "বাজিতপুর", "ভৈরব", "হোসেনপুর", "ইটনা", "করিমগঞ্জ", "কটিয়াদী", "কিশোরগঞ্জ সদর", "কুলিয়ারচর", "মিঠামইন", "নিকলী", "পাকুন্দিয়া", "তাড়াইল"],
        "কুড়িগ্রাম": ["ভুরুঙ্গামারী", "চিলমারী", "কুড়িগ্রাম সদর", "নাগেশ্বরী", "ফুলবাড়ী", "রাজারহাট", "রৌমারী", "উলিপুর", "রাজিবপুর"],
        "কুষ্টিয়া": ["ভেড়ামারা", "দৌলতপুর", "খোকসা", "কুষ্টিয়া সদর", "কুমারখালী", "মিরপুর"],
        "লক্ষ্মীপুর": ["কমলনগর", "লক্ষ্মীপুর সদর", "রামগঞ্জ", "রামগতি", "রায়পুর"],
        "লালমনিরহাট": ["আদিতমারী", "হাতিবান্ধা", "কালীগঞ্জ", "লালমনিরহাট সদর", "পাটগ্রাম"],
        "মাদারীপুর": ["কালকিনি", "মাদারীপুর সদর", "রাজৈর", "শিবচর"],
        "মাগুরা": ["মাগুরা সদর", "মোহাম্মদপুর", "শালিখা", "শ্রীপুর"],
        "মানিকগঞ্জ": ["দৌলতপুর", "ঘিওর", "হরিরামপুর", "মানিকগঞ্জ সদর", "সাটুরিয়া", "শিবালয়", "সিংগাইর"],
        "মেহেরপুর": ["গাংনী", "মেহেরপুর সদর", "মুজিবনগর"],
        "মৌলভীবাজার": ["বড়লেখা", "জুড়ী", "কমলগঞ্জ", "কুলাউড়া", "মৌলভীবাজার সদর", "রাজনগর", "শ্রীমঙ্গল"],
        "মুন্সীগঞ্জ": ["গজারিয়া", "লৌহজং", "মুন্সীগঞ্জ সদর", "সিরাজদিখান", "শ্রীনগর", "টংগিবাড়ি"],
        "ময়মনসিংহ": ["ভালুকা", "ধোবাউড়া", "ফুলবাড়ীয়া", "গফরগাঁও", "গৌরীপুর", "হালুয়াঘাট", "ঈশ্বরগঞ্জ", "মুক্তাগাছা", "নান্দাইল", "ফুলপুর", "ত্রিশাল", "ময়মনসিংহ সদর"],
        "নওগাঁ": ["আত্রাই", "বদলগাছী", "ধামইরহাট", "মান্দা", "মহাদেবপুর", "নওগাঁ সদর", "নিয়ামতপুর", "পত্নিতলা", "পোরশা", "রাণীনগর", "সাপাহার"],
        "নড়াইল": ["কালিয়া", "লোহাগড়া", "নড়াইল সদর"],
        "নারায়ণগঞ্জ": ["আড়াইহাজার", "বন্দর", "নারায়ণগঞ্জ সদর", "রূপগঞ্জ", "সোনারগাঁও"],
        "নরসিংদী": ["বেলাবো", "মনোহরদী", "নরসিংদী সদর", "পলাশ", "রায়পুরা", "শিবপুর"],
        "নাটোর": ["বড়াইগ্রাম", "বাগাতিপাড়া", "গুরুদাসপুর", "লালপুর", "নাটোর সদর", "সিংড়া"],
        "নেত্রকোনা": ["আটপাড়া", "বারহাট্টা", "দুর্গাপুর", "কলমাকান্দা", "কেন্দুয়া", "খালিয়াজুরী", "মদন", "মোহনগঞ্জ", "নেত্রকোনা সদর", "পূর্বধলা"],
        "নীলফামারী": ["ডোমার", "ডিমলা", "জলঢাকা", "কিশোরগঞ্জ", "নীলফামারী সদর", "সৈয়দপুর"],
        "নোয়াখালী": ["বেগমগঞ্জ", "চাটখিল", "হাতিয়া", "কবিরহাট", "নোয়াখালী সদর", "সেনবাগ", "সোনাইমুড়ী", "সুবর্ণচর"],
        "পাবনা": ["আটঘরিয়া", "বেড়া", "ভাঙ্গুড়া", "ঈশ্বরদী", "পাবনা সদর", "সাঁথিয়া", "সুজানগর"],
        "পঞ্চগড়": ["আটোয়ারী", "বোদা", "দেবীগঞ্জ", "পঞ্চগড় সদর", "তেতুলিয়া"],
        "পটুয়াখালী": ["বাউফল", "দশমিনা", "গলাচিপা", "কালাপাড়া", "মির্জাগঞ্জ", "পটুয়াখালী সদর", "দুমকি", "রাঙ্গাবালী"],
        "পিরোজপুর": ["ভাণ্ডারিয়া", "কাউখালী", "মঠবাড়িয়া", "নেছারাবাদ", "পিরোজপুর সদর", "নাজিরপুর", "জিয়ানগর"],
        "রাজবাড়ী": ["বালিয়াকান্দি", "গোয়ালন্দ", "পাংশা", "রাজবাড়ী সদর", "কালুখালী"],
        "রাজশাহী": ["বাঘা", "বাগমারা", "চারঘাট", "দুর্গাপুর", "গোদাগাড়ী", "মোহনপুর", "পবা", "পুঠিয়া", "তানোর"],
        "রাঙ্গামাটি": ["বাঘাইছড়ি", "বরকল", "বেলাইছড়ি", "জুরাছড়ি", "কাপ্তাই", "কাউখালী", "লংগদু", "নানিয়ারচর", "রাজস্থলী", "রাঙ্গামাটি সদর"],
        "রংপুর": ["বদরগঞ্জ", "গঙ্গাচড়া", "কাউনিয়া", "রংপুর সদর", "মিঠাপুকুর", "পীরগাছা", "পীরগঞ্জ", "তারাগঞ্জ"],
        "সাতক্ষীরা": ["আশাশুনি", "দেবহাটা", "কালীগঞ্জ", "কলারোয়া", "সাতক্ষীরা সদর", "শ্যামনগর", "তালা"],
        "শরীয়তপুর": ["ভেদরগঞ্জ", "ডামুড্যা", "গোসাইরহাট", "নড়িয়া", "শরীয়তপুর সদর", "জাজিরা"],
        "শেরপুর": ["ঝিনাইগাতী", "নকলা", "নালিতাবাড়ী", "শেরপুর সদর", "শ্রীবরদী"],
        "সিরাজগঞ্জ": ["বেলকুচি", "চৌহালী", "কামারখন্দ", "কাজীপুর", "রায়গঞ্জ", "শাহজাদপুর", "সিরাজগঞ্জ সদর", "তারাশ", "উল্লাপাড়া"],
        "সুনামগঞ্জ": ["বিশ্বম্ভরপুর", "ছাতক", "দিরাই", "ধর্মপাশা", "দোয়ারাবাজার", "জগন্নাথপুর", "জামালগঞ্জ", "সুরমা", "সুনামগঞ্জ সদর", "তাহিরপুর"],
        "সিলেট": ["বালাগঞ্জ", "বিয়ানীবাজার", "বিশ্বনাথ", "কোম্পানীগঞ্জ", "দক্ষিণ সুরমা", "ফেঞ্চুগঞ্জ", "গোলাপগঞ্জ", "গোয়াইনঘাট", "জৈন্তাপুর", "কানাইঘাট", "সিলেট সদর", "ওসমানীনগর"],
        "টাঙ্গাইল": ["বাসাইল", "ভুয়াপুর", "দেলদুয়ার", "ঘাটাইল", "গোপালপুর", "কালিহাতী", "মধুপুর", "মির্জাপুর", "নগরপুর", "সখিপুর", "টাঙ্গাইল সদর", "ধনবাড়ী"],
        "ঠাকুরগাঁও": ["বালিয়াডাঙ্গী", "হরিপুর", "পীরগঞ্জ", "রাণীশংকৈল", "ঠাকুরগাঁও সদর"]
    };

  // --- DOM REFS ---
  const districtBtn = document.getElementById("districtBtn");
  const districtMenu = document.getElementById("districtMenu");
  const districtText = document.getElementById("districtText");
  const districtList = document.getElementById("districtList");

  const upazilaBtn = document.getElementById("upazilaBtn");
  const upazilaMenu = document.getElementById("upazilaMenu");
  const upazilaText = document.getElementById("upazilaText");
  const upazilaList = document.getElementById("upazilaList");

  const fullNameInput = document.getElementById("fullName");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const streetAddressInput = document.getElementById("streetAddress");
  const additionalNotesInput = document.getElementById("additionalNotes");
  const couponCodeInput = document.getElementById("couponCode");
  const checkoutForm = document.getElementById("checkoutForm");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const successOverlay = document.getElementById("successOverlay");

  // --- STATE ---
  let selectedDistrict = "";
  let selectedUpazila = "";

  // --- HELPERS: populate lists ---
  function populateDistricts() {
    districtList.innerHTML = "";
    Object.keys(data).sort().forEach(district => {
      const li = document.createElement("li");
      li.textContent = district;
      li.className = "px-4 py-2 hover:bg-indigo-100 cursor-pointer";
      districtList.appendChild(li);
    });
  }

  function populateUpazilas(district) {
    upazilaList.innerHTML = "";
    if (!district || !data[district]) return;
    data[district].sort().forEach(up => {
      const li = document.createElement("li");
      li.textContent = up;
      li.className = "px-4 py-2 hover:bg-indigo-100 cursor-pointer";
      upazilaList.appendChild(li);
    });
  }

  // initialize district list
  populateDistricts();

  // --- Event Delegation: district selection ---
  districtList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    selectedDistrict = li.textContent.trim();
    districtText.textContent = selectedDistrict;
    districtMenu.classList.add("hidden");

    // enable upazila button and populate upazila list
    upazilaBtn.disabled = false;
    upazilaBtn.classList.remove("bg-gray-100", "text-gray-500");
    upazilaBtn.classList.add("bg-gray-50", "hover:bg-gray-100", "text-gray-700");
    upazilaText.textContent = "উপজেলা নির্বাচন করুন";
    selectedUpazila = "";
    populateUpazilas(selectedDistrict);
  });

  // --- Event Delegation: upazila selection ---
  upazilaList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    selectedUpazila = li.textContent.trim();
    upazilaText.textContent = selectedUpazila;
    upazilaMenu.classList.add("hidden");
  });

  // --- Toggle dropdowns ---
  districtBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    districtMenu.classList.toggle("hidden");
    // ensure other menu closed
    upazilaMenu.classList.add("hidden");
  });

  upazilaBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!upazilaBtn.disabled) {
      upazilaMenu.classList.toggle("hidden");
      districtMenu.classList.add("hidden");
    }
  });

  // --- Close when clicking outside ---
  document.addEventListener("click", (e) => {
    if (!districtBtn.contains(e.target) && !districtMenu.contains(e.target)) {
      districtMenu.classList.add("hidden");
    }
    if (!upazilaBtn.contains(e.target) && !upazilaMenu.contains(e.target)) {
      upazilaMenu.classList.add("hidden");
    }
  });

  // --- Restore saved data on load ---
document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Check if cart has products ---
    const cart = (typeof CartUtils !== "undefined" && CartUtils.getCart) ? CartUtils.getCart() : [];
    if (!cart || cart.length === 0) {
        alert("Your cart is empty! Redirecting to homepage...");
        window.location.href = "index.html"; // replace with your homepage URL
        return; // stop further execution
    }

    // --- 2. Restore saved checkout data if available ---
    const saved = (typeof CartUtils !== "undefined" && CartUtils.getCheckoutData) ? CartUtils.getCheckoutData() : null;
    if (!saved) return;

    fullNameInput.value = saved.Name || "";
    phoneNumberInput.value = saved.PhoneNumber || "";
    streetAddressInput.value = saved.StreetAddress || "";

    // optional fields
    if (saved.AdditionalNotes) additionalNotesInput.value = saved.AdditionalNotes;
    if (saved.CouponCode) couponCodeInput.value = saved.CouponCode;

    // Restore district & upazila
    if (saved.DistrictAndUpazila) {
        selectedDistrict = saved.DistrictAndUpazila.District || "";
        selectedUpazila = saved.DistrictAndUpazila.Upazila || "";
        if (selectedDistrict) {
            districtText.textContent = selectedDistrict;
            upazilaBtn.disabled = false;
            upazilaBtn.classList.remove("bg-gray-100", "text-gray-500");
            upazilaBtn.classList.add("bg-gray-50", "hover:bg-gray-100", "text-gray-700");
            populateUpazilas(selectedDistrict);
            if (selectedUpazila) {
                upazilaText.textContent = selectedUpazila;
            }
        }
    }
});


  // --- Validation helpers ---
  const requiredElements = [fullNameInput, phoneNumberInput, districtBtn, upazilaBtn, streetAddressInput];

  function resetValidation() {
    requiredElements.forEach(el => {
      el.classList.remove("border-red-500", "ring-2", "ring-red-400");
      el.removeAttribute("aria-invalid");
    });
  }

  function markInvalid(el) {
    el.classList.add("border-red-500", "ring-2", "ring-red-400");
    el.setAttribute("aria-invalid", "true");
  }

  function validateForm() {
    resetValidation();
    const errors = [];

    if (!fullNameInput.value.trim()) errors.push(fullNameInput);
    if (!phoneNumberInput.value.trim()) errors.push(phoneNumberInput);
    if (!selectedDistrict) errors.push(districtBtn);
    if (!selectedUpazila) errors.push(upazilaBtn);
    if (!streetAddressInput.value.trim()) errors.push(streetAddressInput);

    if (errors.length) {
      errors.forEach(markInvalid);
      // Focus the first invalid element and scroll into view
      const first = errors[0];
      try {
        first.focus();
      } catch (err) { /* ignore focus errors */ }
      first.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  }

  // --- Submit handler ---
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // run validation — if invalid, stop and do NOT send
    if (!validateForm()) {
      return;
    }

    // Build payload (same structure as your existing code)
    const cart = (typeof CartUtils !== "undefined" && CartUtils.getCart) ? CartUtils.getCart() : [];
    const delivery = (typeof CartUtils !== "undefined" && CartUtils.getDeliveryChoice) ? CartUtils.getDeliveryChoice() : "unknown";

    const fullName = fullNameInput.value.trim();
    const phoneNumber = phoneNumberInput.value.trim();
    const streetAddress = streetAddressInput.value.trim();
    const additionalNotes = additionalNotesInput.value.trim();
    const couponCode = couponCodeInput.value.trim();

    const ids = cart.map(i => i.id).join(",");
    const titles = cart.map(i => i.title).join(",");
    const images = cart.map(i => (i.image ? i.image.split("/").pop() : "none")).join(",");
    const prices = cart.map(i => `৳${i.price}`).join(",");

    const products = JSON.stringify(cart.map(i => ({
      colorName: i.color || null,
      size: i.size || null,
      quantity: i.quantity
    })));

    const districtData = JSON.stringify([
      { District: selectedDistrict || "" },
      { Upazila: selectedUpazila || "" }
    ]);

    const optionInformation = JSON.stringify({
      AdditionalNotes: additionalNotes || "",
      CouponCode: couponCode || ""
    });

    const params = new URLSearchParams({
      path: "Sheet1",
      action: "write",
      id: ids,
      title: titles,
      image: images,
      price: prices,
      myArea: delivery || "unknown",
      name: fullName,
      PhoneNumber: phoneNumber,
      StreetAddress: streetAddress,
      products,
      districtData,
      optionInformation
    });

    // disable submit button to prevent duplicate clicks
    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("opacity-60", "cursor-not-allowed");
    }

    // show loading overlay and send
    if (loadingOverlay) loadingOverlay.classList.remove("hidden");


    
    fetch(`${SCRIPT_URL}?${params.toString()}`)
      .then(res => res.text())






       .then(txt => {
           if (loadingOverlay) loadingOverlay.classList.add("hidden");
           if (successOverlay) successOverlay.classList.remove("hidden");
       
           // Optional: keep cart count updated visually
           if (typeof CartUtils !== "undefined" && CartUtils.updateCartCount) {
               CartUtils.updateCartCount();
           }
       
           // Save checkout data temporarily for Thank You page ONLY
           if (typeof CartUtils !== "undefined" && CartUtils.saveCheckoutData) {
               CartUtils.saveCheckoutData({
                   Name: fullName,
                   PhoneNumber: phoneNumber,
                   DistrictAndUpazila: { District: selectedDistrict, Upazila: selectedUpazila },
                   StreetAddress: streetAddress,
                   AdditionalNotes: additionalNotes,
                   CouponCode: couponCode
               });
           }
       
           // Temporarily store cart in sessionStorage (for thankyou page)
           sessionStorage.setItem("tempCart", JSON.stringify(cart));
       
           // Permanently clear localStorage cart
           localStorage.removeItem("cart");
       
           // Auto-redirect to thankyou page
           window.location.href = "thankyou.html"; 
       })






      .catch(err => {
        if (loadingOverlay) loadingOverlay.classList.add("hidden");
        alert("❌ Error sending order: " + (err && err.message ? err.message : err));
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove("opacity-60", "cursor-not-allowed");
        }
      });
  });

}) ();


