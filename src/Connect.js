import { useStarknet, useConnectors, useStarknetInvoke, useStarknetTransactionManager, useContract } from "@starknet-react/core";
import GameAbi from "./abi/game.json"

const CONTRACT_ADDRESS = "0x079e5410c391781051d2601692f7221c88b7f69d06234833db50c812fb474d8e";

export function useStarkNet() {
  return useContract({ abi: GameAbi, address: CONTRACT_ADDRESS });
}

export function Account() {
  const { account } = useStarknet();
  return <div>Account: {account || "Your are not connected!"}</div>;
}

export function ButtonConnect() {
  const { connect, connectors } = useConnectors();
  return (
    <div className="row gtr-25 gtr-uniform">
      {connectors.map((connector) =>
        connector.available() ? (
          <div >
            <button key={connector.id()} onClick={() => connect(connector)}>
              Connect {connector.name()}
            </button>
          </div>
        ) : null
      )}
    </div>
  );
}

export function ButtonControl({ move }) {
  const { contract } = useStarkNet();
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: move,
  });

  return (
    <div>
      <div>
        <button onClick={() => invoke({ args: [] })}>{move}</button>
      </div>
    </div>
  );
}

function TransactionItem({ transaction, onClick }) {
  return (
    <div>
      {transaction.status}: {transaction.transactionHash} <button onClick={onClick}>remove</button>
    </div>
  );
}

export function TransactionManager() {
  const { transactions, removeTransaction } = useStarknetTransactionManager();
  return (
    <div>
      <div>{transactions.length === 0 ? "No transactions" : transactions.map((tx, index) => <TransactionItem key={index} transaction={tx} onClick={() => removeTransaction(tx.transactionHash)} />)}</div>
    </div>
  );
}