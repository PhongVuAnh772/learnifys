interface TransferDataProps {
  amount: number;
  accountNumber: string;
  bankBin: number;
}

export const getTransferData = ({ amount, accountNumber, bankBin }: TransferDataProps) => {
  return `00020101021238560010A00000072701260006${bankBin}0112${accountNumber}0208QRIBFTTA53037045405${amount}5802VN62220818${`Nap tien mua dich vu CRM`}`;
};