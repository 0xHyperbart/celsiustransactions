import NetWorth from "../../components/NetWorth";
import { useRouter } from "next/router";

export default function NetWorthType() {
  const router = useRouter();
  const type = router.query.type;
  return <NetWorth type={type} />;
}
