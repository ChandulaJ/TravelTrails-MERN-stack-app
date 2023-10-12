//remove this file -------------------------------------------------------
import { useEffect, useState } from "react";

//components

import AccountDetails from "../components/AccountDetails";
import AccountForm from "../components/AccountForm";

const AccountCreation = () => {

  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

 

 

  return (
    <div className="accountCreation">
      
      <div className="accounts">
        {accounts && accounts.map((account) => (
          <AccountDetails key={account._id} account={account} />
        ))}
        </div>
        <AccountForm />
    </div>
  );
};

export default AccountCreation;
