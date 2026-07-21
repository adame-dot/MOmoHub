let transactions = [

    {
        id: "TXN001",
        type: "Deposit",
        amount: 100000,
        currency: "RWF",
        status: "Completed"
    }

];

function loadTransactions() {

    const table = document.getElementById("transactions-data");

    table.innerHTML = "";

    transactions.forEach(transaction => {

        table.innerHTML += `
        <tr>
            <td>${transaction.id}</td>
            <td>${transaction.type}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.currency}</td>
            <td>${transaction.status}</td>
        </tr>
        `;

    });

}

loadTransactions();

// Transaction nshya

transactions.push({

    id: "TXN002",
    type: "Transfer",
    amount: 25000,
    currency: "RWF",
    status: "Pending"

});
transactions.push({
    id: "TXN002",
    type: "Transfer",
    amount: 50000,
    currency: "RWF",
    status: "Pending"
});
loadTransactions();