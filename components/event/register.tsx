import { fetcher } from "@/utils/fetch";
import { Event } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import { ChangeEvent, useState, FormEvent, useCallback } from "react";
import { toast } from "../ui/use-toast";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Struct,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Register({
  setRegister,
  id,
  eventData,
}: {
  setRegister: any;
  id: string | undefined;
  eventData: Event | null;
}) {
  const initialState = { fullName: "", email: "" };
  const [credentials, setCredentials] = useState(initialState);
  const initialAnswers = eventData?.questions.reduce(
    (prev, key) => ({ ...prev, [key]: "" }),
    {}
  );
  const [answers, setAnswers] = useState<any>(initialAnswers);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const registered = await fetcher("/api/event/register", "POST", {
        ...credentials,
        answers,
        id,
      });
      toast({
        variant: registered.success ? "default" : "destructive",
        description: registered.message,
      });
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleAnswers = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="fixed flex overflow-y-scroll justify-center flex-col items-center top-0 left-0 bottom-0 right-0 w-full h-full backdrop-blur-xl z-50 bg-[#1e1e1e]/75 p-5">
      <button
        className="absolute top-5 right-5"
        onClick={() => setRegister(false)}
      >
        <X />
      </button>
      {submitting ? (
        <div className="flex items-center flex-col gap-2.5">
          <Loader2 className="loader" />
          <h4 className="text-xl font-medium">Submitting...</h4>
        </div>
      ) : (
        <form action="" onSubmit={handleSubmit}>
          <h4 className="text-center font-bold text-3xl mb-10">
            Register for {eventData?.title}
          </h4>

          <div className="space-y-2.5 w-full">
            <div className="space-y-1 w-full">
              <h4 className="font-medium text-sm">Full Name</h4>
              <input
                type="text"
                required
                name="fullName"
                className="w-full border-white/10"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Email</h4>
              <input
                type="email"
                required
                className="w-full border-white/10"
                name="email"
                placeholder="johndoe@email.com"
                onChange={handleChange}
              />
            </div>
            {Object.keys(answers).map((item, i) => (
              <div key={i} className="space-y-1">
                <h4 className="font-medium text-sm">{item}</h4>
                <input
                  required
                  className="w-full border-white/10"
                  name={item}
                  onChange={handleAnswers}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full mt-5 grad px-5 p-2.5 text-black font-medium rounded-lg"
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
}

// const sendSOL = useCallback(async () => {
//   if (!publicKey) throw new WalletNotConnectedError();

//   // 890880 lamports as of 2022-09-01
//   const feeInLamports = eventData?.fee! * LAMPORTS_PER_SOL;

//   const transaction = new Transaction().add(
//     SystemProgram.transfer({
//       fromPubkey: publicKey,
//       toPubkey: new PublicKey(walletAddress),
//       lamports: feeInLamports,
//     })
//   );

//   const {
//     context: { slot: minContextSlot },
//     value: { blockhash, lastValidBlockHeight },
//   } = await connection.getLatestBlockhashAndContext();

//   try {
//     const signature = await sendTransaction(transaction, connection, {
//       minContextSlot,
//     });

//     await connection.confirmTransaction({
//       blockhash,
//       lastValidBlockHeight,
//       signature,
//     });
//   } catch (err) {
//     toast({
//       description: "Failed to Complete Transaction",
//       variant: "destructive",
//     });
//   }
// }, [publicKey, sendTransaction, connection]);
