const AccountDetails = ({ account }) => {
    return(
        <div className="account-details">
            <h4>{account.username}</h4>
            <p><strong>Email: </strong>{account.email}</p>
            <p><strong>Address: </strong>{account.address}</p>
            <p><strong>Occupation: </strong>{account.occupation}</p>
            <p><strong>DOB: </strong>{account.dateofbith}</p>
            <p>{account.createdAt}</p>

        </div>
    )
}
export default AccountDetails
