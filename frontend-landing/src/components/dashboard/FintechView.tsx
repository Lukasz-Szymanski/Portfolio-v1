import AccountList from './AccountList';
import BalanceChart from './BalanceChart';
import TransactionHistory from './TransactionHistory';
import TransferForm from './TransferForm';
import XRayWrapper from '../shared/XRayWrapper';
import type { Account, Transaction } from '../../api/fintech';

interface FintechViewProps {
  accounts: Account[] | undefined;
  transactions: Transaction[] | undefined;
}

function FintechView({ accounts, transactions }: FintechViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section className="lg:col-span-3">
        <h2 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-3 uppercase tracking-tight font-display text-slate-200">
          Your Accounts
        </h2>
        <XRayWrapper label="Relational Data" tech="Postgres">
          <AccountList accounts={accounts || []} />
        </XRayWrapper>
      </section>

      <div className="lg:col-span-2 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-3 uppercase tracking-tight font-display text-slate-200">
            Financial Growth
          </h2>
          <div className="glass-card p-6 rounded-3xl border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent">
            <XRayWrapper label="Data Visualization" tech="Recharts" description="Dynamic balance reconstruction">
              <BalanceChart
                transactions={transactions || []}
                currentBalance={parseFloat(accounts?.[0]?.balance || "0")}
              />
            </XRayWrapper>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-6 border-l-4 border-slate-500 pl-3 uppercase tracking-tight font-display text-slate-200">
            Recent Activity
          </h3>
          {accounts && accounts.length > 0 ? (
            <XRayWrapper label="Transaction Log" tech="Django">
              <TransactionHistory accountId={accounts[0].id} />
            </XRayWrapper>
          ) : (
            <div className="text-slate-500">No account.</div>
          )}
        </section>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-3 uppercase tracking-tight font-display text-slate-200">
          Quick Transfer
        </h2>
        {accounts && accounts.length > 0 ? (
          <XRayWrapper label="Atomic Action" tech="Django">
            <TransferForm senderId={accounts[0].id} />
          </XRayWrapper>
        ) : null}
      </section>
    </div>
  );
}

export default FintechView;
