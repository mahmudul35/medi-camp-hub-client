import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useContextt from "../../hooks/useContext";
const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContextt();
  const [payments, setPayments] = React.useState([]);

  React.useEffect(() => {
    axiosSecure.get(`/payments/${user?.email}`).then((res) => {
      setPayments(res.data);
    });
  }, [user?.email]);

  //   axios.get(`https://medi-camp-hub-sever.vercel.app/payments/${user?.email}`).then((res) => {
  //     console.log(res.data);
  //   });
  //   const { data: payments } = useQuery({
  //     queryKey: ["payments", user?.email],
  //     queryFn: async () => {
  //       const { data } = await axiosSecure.get(`/payments/${user?.email}`);
  //       return data;
  //     },
  //   });
  return (
    <div className="container mx-auto p-4">
      <h1>Total user payment :{payments.length}</h1>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Camp Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fees</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              Transaction ID{" "}
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Payment Status
            </th>
            {/* <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Confirmation Status
            </th> */}
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}
            >
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {payment.campName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {payment.fees}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {payment.transactionId}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {payment.paymentStatus}
              </td>
              {/* <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {payment.confirmationStatus}
              </td> */}
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {new Date(payment.date).toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
