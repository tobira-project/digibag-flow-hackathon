keys=`flow keys generate -o json`

private=$(echo $keys | jq -r ".private")
public=$(echo $keys | jq -r ".public")

flow accounts create --network testnet --key $public --signer testnetAccount1

echo $private > key
echo $public > key.pub