# Complex Form Validation and Dynamic DOM Manipulation

Yeh ek lightweight User Registration aur Interactive Dashboard application hai jise pure **Vanilla JavaScript (ES6+)**, **HTML5**, aur **CSS3** ka istemal karke banaya gaya hai. Yeh project bina kisi external framework (jaise React ya Angular) ke client-side routing aur live validation ko effectively demonstrate karta hai.

---

## 🚀 Features (Khubiyan)

* **Complex Form Validation:** * **Username Validation:** Kam se kam 5 characters hona zaroori hai.
    * **Real-time Password Strength Meter:** Password ki complexity ke hisab se color-coded bar (Red/Orange/Green) scale hoti hai (Regex constraints ke sath).
    * **Confirm Password Check:** Live check karta hai ki dono password aapas mein match ho rahe hain ya nahi.
* **Dynamic DOM Manipulation:** Bina page reload kiye, JavaScript ke zariye HTML elements ke classes aur text ko real-time mein badla jata hai.
* **Client-Side Routing:** Custom Hash-based routing (`#/signup` aur `#/dashboard`) ka istemal kiya gaya hai taaki user experience seamless rahe.

---

## 📁 Project Structure (Files ki Banawat)

```text
Dashboard/
│
├── index.html   # Application ka structural dhaanchan aur templates
├── styles.css   # Dynamic visual states, coloring aur strength meter ki styling
├── app.js       # Core routing engine, regex validation aur DOM manipulation logic
└── README.md    # Project ki jankari (Yeh file)
