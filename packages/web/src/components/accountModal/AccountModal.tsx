import useArrangementStore from "@/stores/arrangementStore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useFlow } from "context/flow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

/**
 * アカウント情報を表示するコンポーネント
 * @returns 
 */
const AccountModal = () => {
  const { magic } = useFlow();

  const { closeAccountModal } = useArrangementStore((state) => ({
    closeAccountModal: state.closeAccountModal,
  }))
  const [accountAddress, setAccountAddress] = useState<string>('')
  const router = useRouter();

  // ログアウトボタンの処理
  const handleLogout = async () => {
      if (!magic) return;
      await magic.user.logout();
      setAccountAddress('');
  }

  const handleSignUp = async () => {
    router.push('/login');
  }

  // モーダル外をクリックで閉じる
  const handleOuterClick = () => {
    closeAccountModal();
  }

  const handleInnerClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
  }

  useEffect(() => {
    if (magic) {
      magic.user.isLoggedIn().then(async (magicIsLoggedIn) => {
        if (magicIsLoggedIn) {
          const { publicAddress } = await magic.user.getMetadata();
          if (publicAddress) {
            setAccountAddress(publicAddress);
          }
        }
      });
    }
  }, [magic]);

  return <>
    <div
      className="account-outer"
      onClick={handleOuterClick}
    >
      <div
        className="account-container"
        onClick={(ev) => handleInnerClick(ev)}
      >
        {accountAddress === '' ? (
          <>
            <div
              className="account-logout-btn-container"
              onClick={handleSignUp}
            >
              <button className="account-logout-btn">Sign up</button>
            </div>
          </>
        ) : (
          <>
          <div className="account-address-container">
            <p className="account-address-text">Account address:</p>
            <p className="account-address-text tracking-wide">
              <a href={`https://testnet.flowscan.org/account/${accountAddress}`} target="_blank" rel="noreferrer">
                {accountAddress} <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            </p>
          </div>
          <div
            className="account-logout-btn-container"
            onClick={handleLogout}
          >
            <button className="account-logout-btn">Log out</button>
          </div>
        </>
        )}
      </div>
    </div>
  </>
}

export default AccountModal