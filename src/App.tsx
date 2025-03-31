import { useEffect, useState } from "react";
import "./App.css";
import { walletService } from "@services/wallet.service";
import StatsCard from "./components/StatsCard";
import { FaSave } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { FaTelegram, FaTwitter } from "react-icons/fa";
import Swal from "sweetalert2";

function App() {
  const [currentAccount, setCurrentAccount] = useState<string>("");

  async function connectWallet() {
    const wallet = await walletService.connect();
    setCurrentAccount(wallet);
  }

  useEffect(() => {
    connectWallet();
  }, []);

  const handleDeposit = () => {
    Swal.fire({
      title: "¿Cuánto deseas depositar?",
      input: "number",
      inputLabel: "Monto en USDC",
      showCancelButton: true,
      confirmButtonText: "Depositar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value || parseFloat(value) <= 0) {
          return "Por favor ingresa un monto válido";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Éxito!", `Has depositado ${result.value} USDC`, "success");
      }
    });
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#CEEDFB] to-[#E8DFFC] p-4">
      <div className="min-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img src="/img/logo.svg" alt="Vaquita Logo" className="w-8 h-8" />
            <p className="text-xl font-bold">Vaquita</p>
          </div>
          <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm font-mono">
            {currentAccount ? (
              currentAccount.slice(0, 6) + "..." + currentAccount.slice(-4)
            ) : (
              <button onClick={connectWallet}>Connect Wallet</button>
            )}
          </div>
        </div>

        {/* <Input label="Cuenta" value={currentAccount} disabled={true} /> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatsCard
            icon={<FaSave />}
            title="1M USDC"
            subtitle="Total Staked"
          />
          <StatsCard icon={<BiMoney />} title="±5% + 2%" subtitle="100K USDC" />
        </div>

        {/* Vaquita Image */}
        <div className="flex justify-center">
          <img src="/img/success.svg" alt="Vaquita" className="w-48 h-48" />
        </div>

        {/* Deposit Button */}
        <button
          onClick={handleDeposit}
          className="w-full bg-green-500 py-4 rounded-xl font-bold hover:bg-green-600 transition-colors"
        >
          Deposit Now
        </button>

        {/* Stats Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatsCard
            icon={<BiMoney />}
            title="300 USDC"
            subtitle="Total Saved"
          />
          <StatsCard
            icon={<FaSave />}
            title="2 days"
            subtitle="178 days remaining"
          />
        </div>
      </div>
      {/* Social Links */}
      <div className="flex gap-4 my-4 w-full justify-end">
        <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <FaTelegram className="text-2xl text-gray-600" />
        </button>
        <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <FaTwitter className="text-2xl text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default App;
