import useArrangementStore from "@/stores/arrangementStore"
import { useRouter } from "next/router"
import { useState } from "react"

/**
 * アカウント情報を表示するコンポーネント
 * @returns 
 */
const AccountModal = () => {
  const { closeAccountModal } = useArrangementStore((state) => ({
    closeAccountModal: state.closeAccountModal,
  }))
  const [accountAddress, setAccountAddress] = useState<string>('0xabc')
  const router = useRouter();

  // ログアウトボタンの処理
  const handleLogout = () => {
    // ログアウト処理
    //
    router.push('/login');
  }

  // モーダル外をクリックで閉じる
  const handleOuterClick = () => {
    closeAccountModal();
  }

  const handleInnerClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
  }

  return <>
    <div
      className="account-outer"
      onClick={handleOuterClick}
    >
      <div
        className="account-container"
        onClick={(ev) => handleInnerClick(ev)}
      >
        <div className="account-address-container">
          <p className="account-address-text">Account address:</p>
          <p className="account-address-text">{accountAddress}</p>
        </div>
        <div
          className="account-logout-btn-container"
          onClick={handleLogout}
        >
          <button className="account-logout-btn">Log out</button>
        </div>
      </div>
    </div>
  </>
}

export default AccountModal