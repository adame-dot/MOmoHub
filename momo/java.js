document.addEventListener("DOMContentLoaded", function() {
    
    // izi ni defoult data zihinduka ukomara kwakira transaction
    const defaultTransactions = [
        { name: "Jean Claude", phone: "0788******", amount: 25000, status: "Paid" },
        { name: "Alice", phone: "079*******", amount:10000, status: "Paid" },
        { name: "Patrick", phone: "0788******", amount: 50000, status: "Paid" },
        { name: "Emmy", phone: "078*******", amount: 18000, status: "Paid" }
        
    ];

    // 2. Gusoma amakuru abitse muri LocalStorage (Niba nta muntu urandikamo, ifata ya yandi 4 ya mbere)
    let transactions = JSON.parse(localStorage.getItem("momo_transactions"));
    
    if (!transactions) {
        transactions = defaultTransactions;
        localStorage.setItem("momo_transactions", JSON.stringify(transactions));
    }

    // 3. Gufata HTML Elements
    const tableBody = document.getElementById("transactions-data");
    const todayIncomeEl = document.getElementById("today-income");
    const weekIncomeEl = document.getElementById("week-income");
    const monthIncomeEl = document.getElementById("month-income");
    const customerCountEl = document.getElementById("customer-count");
    const paymentForm = document.getElementById("payment-form");

    // Id y'ibyerekana pages
    const linkDashboard = document.getElementById("link-dashboard");
    const linkPayments = document.getElementById("link-payments");
    const dashboardView = document.getElementById("dashboard-view");
    const paymentsView = document.getElementById("payments-view");
    const pageTitle = document.getElementById("page-title");

    // 4. NAVIGATION (Guhinduranya ibice)
    if (linkDashboard && linkPayments) {
        linkDashboard.addEventListener("click", function(e) {
            e.preventDefault();
            dashboardView.classList.remove("hidden");
            paymentsView.classList.add("hidden");
            pageTitle.innerText = "Dashboard";
            
            linkDashboard.classList.add("active");
            linkPayments.classList.remove("active");
        });

        linkPayments.addEventListener("click", function(e) {
            e.preventDefault();
            paymentsView.classList.remove("hidden");
            dashboardView.classList.add("hidden");
            pageTitle.innerText = "Payments";

            linkPayments.classList.add("active");
            linkDashboard.classList.remove("active");
        });
    }

    // 5. Agafunction kabara kakandika amakuru kuri Dashboard
    function updateDashboard() {
        if (!tableBody) return;
        tableBody.innerHTML = "";
        
        // Gusoma transactions zose (izabitse muri LocalStorage)
        transactions.forEach(item => {
            const formattedAmount = item.amount.toLocaleString();
            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.phone}</td>
                    <td>${formattedAmount} RWF</td>
                    <td><span class="status paid">${item.status}</span></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        const todayTotal = transactions.reduce((sum, item) => sum + item.amount, 0);
        todayIncomeEl.innerText = `${todayTotal.toLocaleString()} RWF`;

        const weekTotal = todayTotal * 6;
        const monthTotal = todayTotal * 24;
        weekIncomeEl.innerText = `${weekTotal.toLocaleString()} RWF`;
        monthIncomeEl.innerText = `${monthTotal.toLocaleString()} RWF`;

        customerCountEl.innerText = transactions.length;
    }

    // 6. Kwakira niba umuntu yishyuye no kubika amakuru ye burundu
    if (paymentForm) {
        paymentForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const nameInput = document.getElementById("cust-name").value;
            const phoneInput = document.getElementById("cust-phone").value;
            const amountInput = parseInt(document.getElementById("cust-amount").value);

            if (nameInput && phoneInput && amountInput) {
                const newTransaction = {
                    name: nameInput,
                    phone: phoneInput,
                    amount: amountInput,
                    status: "Paid"
                };

                // 1. Kwongera umuntu kuri list
                transactions.push(newTransaction);

                // 2. Kubika iyi list nshya muri LocalStorage (ubwonko bwa browser)
                localStorage.setItem("momo_transactions", JSON.stringify(transactions));

                // 3. Guhita twubura dashboard
                updateDashboard();
                paymentForm.reset();

                // 4. Guhita tugaruka kuri Dashboard view
                linkDashboard.click();
            }
        });
    }

    // 7. Guhamagara amakuru ku nshuro ya mbere urubuga rukifungura
    updateDashboard();
});