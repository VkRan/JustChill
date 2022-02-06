import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from 'axios';
import { useEffect, useState, useMemo } from "react";

export default function Home() {
  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ], []);
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get('user/stats');
        res.data.map((item) =>
          setStats(prev => [
            ...prev,
            { name: MONTHS[item._id - 1], "Users": item.total }
          ]))
      } catch (error) {
      }
    }
    getStats();
  }, [MONTHS])
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={stats} title="User Analytics" grid dataKey="Users" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
