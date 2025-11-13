import { useState } from 'react'
import { BalanceCard } from './BalanceCard'
import { DepositForm } from './DepositForm'
import { WithdrawButton } from './WithdrawButton'

export function PiggyBankDashboard() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit')

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your PiggyBank</h2>
        <p>Manage your savings with discipline</p>
      </div>

      <BalanceCard />

      <div className="action-panel">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'deposit' ? 'active' : ''}`}
            onClick={() => setActiveTab('deposit')}
          >
            Deposit
          </button>
          <button
            className={`tab ${activeTab === 'withdraw' ? 'active' : ''}`}
            onClick={() => setActiveTab('withdraw')}
          >
            Withdraw
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'deposit' ? (
            <DepositForm />
          ) : (
            <WithdrawButton />
          )}
        </div>
      </div>
    </div>
  )
}
