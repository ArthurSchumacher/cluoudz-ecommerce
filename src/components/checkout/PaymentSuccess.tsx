import { FaCheckCircle } from "react-icons/fa";

function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p>
        <FaCheckCircle size={40} className="text-success" />
      </p>
      <p>Pagamento realizado com sucesso!</p>
    </div>
  );
}

export default PaymentSuccess;
