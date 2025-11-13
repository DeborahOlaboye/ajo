import { formatEther } from 'viem'
import { usePiggyBank } from '../hooks/usePiggyBank'
import { useTimelock } from '../hooks/useTimelock'

export function BalanceCard() {
  const { balance, unlockTime } = usePiggyBank()
  const { timeRemaining, isUnlocked } = useTimelock(unlockTime)

  return (
    <div className="balance-card">
      <div className="balance-info">
        <h3>Total Balance</h3>
        <div className="balance-amount">
          {balance ? formatEther(balance) : '0.00'} ETH
        </div>
      </div>

      <div className="timelock-info">
        {isUnlocked ? (
          <div className="unlocked">
            <span className="status-icon">🔓</span>
            <p>Unlocked - Ready to withdraw!</p>
          </div>
        ) : timeRemaining ? (
          <div className="locked">
            <span className="status-icon">🔒</span>
            <p>Locked until:</p>
            <div className="countdown">
              <div className="time-unit">
                <span className="value">{timeRemaining.days}</span>
                <span className="label">Days</span>
              </div>
              <div className="time-unit">
                <span className="value">{timeRemaining.hours}</span>
                <span className="label">Hours</span>
              </div>
              <div className="time-unit">
                <span className="value">{timeRemaining.minutes}</span>
                <span className="label">Min</span>
              </div>
              <div className="time-unit">
                <span className="value">{timeRemaining.seconds}</span>
                <span className="label">Sec</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-lock">
            <p>No active time lock</p>
          </div>
        )}
      </div>
    </div>
  )
}
