import { styled, useTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react'
import './App.css'
import { Button } from '@mui/material';

function App() {
  // MUIのテーマを使用(ダークテーマ対応のため)
  const theme = useTheme()
  // Drawerの開閉ステータス
  const [open, setOpen] = useState(true)
  // AppBarコンポーネント
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: 300,
      width: `calc(100% - ${300}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  // Drawコンポーネント
  const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'} )(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 300,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }))
  // RootFolder コンポーネント
  const RootFolder = ({orgObject, setOrg}) => {
    // Folder コンポーネント
    const Folder = ({parent, data, foldername, setOrg}) => {
      const [openState, setOpenState] = useState(() => false)
      let folderPath = parent + "/" + foldername
      const handleClick = (e) => {
        e.stopPropagation()
        setOpenState(!openState)
      }
      const test = (e) => {
        e.stopPropagation()
        console.log(data.code)
        setOrg(data.code)
      }
      if ( Object.keys(data).filter((key) => key !== "code").length > 0 ) {
        // 小要素を持っていたら Folder を再帰的に呼び出す
        return (
          <div key={folderPath} data-path={folderPath} data-key={data["code"]} onClick={test}>
            <ListItemButton dense>
              <ListItemIcon><ArticleOutlinedIcon /></ListItemIcon>
              <ListItemText primary={foldername} />
              {openState ? <ExpandLess onClick={handleClick}/>
                         : <ExpandMore onClick={handleClick}/>}
            </ListItemButton>
            <Collapse in={openState}>
              <Box sx={{p:0, m:0, pl:2}}>
                <List dense>
                  <FolderList parent={folderPath} data={data} setOrg={setOrg} />
                </List>
              </Box>
            </Collapse>
          </div>
        )
      } else {
        // 小要素を持っていないエッジのアイテム
        return (
          <div
            key={folderPath}
            data-path={folderPath}
            data-key={data["code"]}
            onClick={test}
          >
            <ListItemButton dense>
              <ListItemIcon><ArticleOutlinedIcon /></ListItemIcon>
              <ListItemText primary={foldername} />
            </ListItemButton>
          </div>
        )
      }
    }
    // FolderList コンポーネント
    const FolderList = ({parent, data, setOrg}) => {
      return (
          <>
          {Object.keys(data).map((key) => {
              if (key === "code") return false
              return (
                  <Folder parent={parent} data={data[key]} key={key} foldername={key} setOrg={setOrg} />
              )
          })}
          </>
      )
    }
    return (
      <List dense>
        <FolderList parent={""} data={orgObject} setOrg={setOrg} />
      </List>
    )
  }
  const PersonRow = ({objid, obj}) => {
    console.log(obj)
    return (
      <ListItem sx={{p:0}}>
        <ListItemText
            sx={{
              p:1, m:0,
              background: 'white',
              borderStyle: 'solid', borderWidth: '1px',
              borderColor: 'white white black black',
              width: 4/10, textOverflow: 'ellipsis', whiteSpace: 'nowrap'
            }}
            primary={objid} />
        <ListItemText
          sx={{
            p:1, m:0,
            background: 'white',
            borderStyle: 'solid', borderWidth: '1px',
            borderColor: 'white white black black',
            width: 2/10, textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}
          primary={obj["name"]} />
        <ListItemText
          sx={{
            p:1, m:0,
            background: 'white',
            borderStyle: 'solid', borderWidth: '1px',
            borderColor: 'white white black black',
            width: 2/10, textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}
          primary={obj["orgcode"]} />
        <ListItemText
          sx={{
            p:1, m:0,
            background: 'white',
            borderStyle: 'solid', borderWidth: '1px',
            borderColor: 'white white black black',
            width: 1/10, textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}
          primary={obj["employee-no"]} />
        <ListItemText
          sx={{
            p:1, m:0,
            background: 'white',
            borderStyle: 'solid', borderWidth: '1px',
            borderColor: 'white black black black',
            width: 1/10, textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}
          primary={obj["age"]} />
      </ListItem>
  )
  }
  const PersonView = ({personObject, org}) => {
    return (
      <List dense>
        <ListItem sx={{p:0}}>
          <ListItemText
            sx={{
              p:1, width: 4/10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              background: 'rgb(200,200,200)',
              borderStyle: 'solid', borderWidth: '1px',
              borderColor: 'rgb(200,200,200) rgb(100,100,100) rgb(200,200,200) rgb(230,230,230)'
            }}
            primary={"メールアドレス"} />
          <ListItemText
            sx={{
              p:1, width: 2/10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              background: 'rgb(200,200,200)',
              borderStyle: 'solid', borderWidth: '1px',
              borderColor: 'rgb(200,200,200) rgb(100,100,100) rgb(200,200,200) rgb(230,230,230)'
            }}
            primary={"氏名"} />
          <ListItemText
            sx={{
              p:1, width: 2/10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              background: 'rgb(200,200,200)',
              borderStyle: 'solid', borderWidth: '1px',
              borderColor: 'rgb(200,200,200) rgb(100,100,100) rgb(200,200,200) rgb(230,230,230)'
            }}
            primary={"所属"} />
          <ListItemText
            sx={{
              p:1, width: 1/10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              background: 'rgb(200,200,200)',
              borderStyle: 'solid', borderWidth: '1px',
              borderColor: 'rgb(200,200,200) rgb(100,100,100) rgb(200,200,200) rgb(230,230,230)'
            }}
            primary={"社員番号"} />
          <ListItemText
            sx={{
              p:1, width: 1/10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              background: 'rgb(200,200,200)',
              borderStyle: 'solid', borderWidth: '1px',
              borderColor: 'rgb(200,200,200) rgb(100,100,100) rgb(200,200,200) rgb(230,230,230)'
            }}
            primary={"年齢"} />
        </ListItem>
        {Object.keys(personObject).map((key) => {
              if (personObject[key]["orgcode"] !== org) return
              //if (key === "code") return false
              return (
                <PersonRow objid={key} obj={personObject[key]} />
              )
          })}
      </List>
    )
  }
  // 組織の初期データ
  const [orgObject, setOrgObject] = useState({
    "営業部": { "code": "sales",
      "営業1部": {"code": "sales-sales1"},
      "営業2部": {"code": "sales-sales2"},
    },
    "総務部": {"code": "ga"},
    "経理部": {"code": "acct"},
    "大阪支社": { "code": "osaka",
      "営業統括": { "code": "osaka-sales",
        "製造営業部": {"code": "osaka-sales-mfg"},
        "官公庁営業部": {"code": "osaka-sales-pub"},
      }
    }
  })
  // 社員の初期データ
  // using: https://namegen.jp
  const [personObject, setPersonObject] = useState({
    "daisuke.kimura@example.com": {"name": "木村 大介", "orgcode": "ga", "employee-no": 1, "age": 55},
    "ryota.ito@example.com": {"name": "伊藤 亮太", "orgcode": "sales-sales2", "employee-no": 2, "age": 24},
    "yutaka.shimizu@example.com": {"name": "清水 豊", "orgcode": "osaka-sales", "employee-no": 3, "age": 61},
    "takeshi.ito@example.com": {"name": "伊藤 剛", "orgcode": "osaka-sales", "employee-no": 4, "age": 58},
    "shuichi.kato@example.com": {"name": "加藤 修一", "orgcode": "osaka-sales-mfg", "employee-no": 5, "age": 54},
    "naoki.oshima@example.com": {"name": "大島 直樹", "orgcode": "ga", "employee-no": 6, "age": 24},
    "hiroshi.mori@example.com": {"name": "森 博史", "orgcode": "sales-sales1", "employee-no": 7, "age": 41},
    "naoki.yokoi@example.com": {"name": "横井 直樹", "orgcode": "acct", "employee-no": 8, "age": 19},
    "hirofumi.takahashi@example.com": {"name": "高橋 裕史", "orgcode": "osaka-sales", "employee-no": 9, "age": 31},
    "yoshikazu.kato@example.com": {"name": "加藤 義一", "orgcode": "ga", "employee-no": 10, "age": 21},
    "koichi.ono@example.com": {"name": "小野 光一", "orgcode": "osaka-sales", "employee-no": 11, "age": 24},
    "yuta.iida@example.com": {"name": "飯田 裕太", "orgcode": "ga", "employee-no": 12, "age": 37},
    "taro.oku@example.com": {"name": "奥 太郎", "orgcode": "osaka-sales", "employee-no": 13, "age": 35},
    "masanori.ito@example.com": {"name": "伊藤 雅紀", "orgcode": "sales-sales1", "employee-no": 14, "age": 22},
    "masanori.tanaka@example.com": {"name": "田中 政徳", "orgcode": "sales-sales1", "employee-no": 15, "age": 37},
    "hiroyuki.takahashi@example.com": {"name": "高橋 裕之", "orgcode": "sales-sales2", "employee-no": 16, "age": 21},
    "koichi.nakamura@example.com": {"name": "中村 浩一", "orgcode": "acct", "employee-no": 17, "age": 50},
    "tetsuya.yokoyama@example.com": {"name": "横山 哲也", "orgcode": "sales-sales2", "employee-no": 18, "age": 52},
    "takashi.matsubara@example.com": {"name": "松原 隆", "orgcode": "osaka-sales", "employee-no": 19, "age": 47},
    "hajime.yamada@example.com": {"name": "山田 創", "orgcode": "osaka-sales-mfg", "employee-no": 20, "age": 64},
    "yoko.suzuki@example.com": {"name": "鈴木 洋子", "orgcode": "sales-sales1", "employee-no": 21, "age": 23},
    "aki.takahashi@example.com": {"name": "高橋 亜紀", "orgcode": "sales-sales2", "employee-no": 22, "age": 52},
    "mariko.yamaguchi@example.com": {"name": "山口 真理子", "orgcode": "sales-sales2", "employee-no": 23, "age": 48},
    "satomi.sasaki@example.com": {"name": "佐々木 里美", "orgcode": "ga", "employee-no": 24, "age": 24},
    "yoko.ogasawara@example.com": {"name": "小笠原 陽子", "orgcode": "sales-sales2", "employee-no": 25, "age": 53},
    "saori.otani@example.com": {"name": "大谷 沙織", "orgcode": "acct", "employee-no": 26, "age": 24},
    "maho.suzuki@example.com": {"name": "鈴木 真穂", "orgcode": "ga", "employee-no": 27, "age": 19},
    "yuko.kamiya@example.com": {"name": "神谷 優子", "orgcode": "sales-sales2", "employee-no": 28, "age": 27},
    "akemi.minami@example.com": {"name": "南 明美", "orgcode": "acct", "employee-no": 29, "age": 40},
    "naoko.oyama@example.com": {"name": "大山 尚子", "orgcode": "osaka-sales-mfg", "employee-no": 30, "age": 28},
    "risa.hattori@example.com": {"name": "服部 梨沙", "orgcode": "sales-sales2", "employee-no": 31, "age": 28},
    "yuki.saito@example.com": {"name": "斉藤 由季", "orgcode": "sales-sales2", "employee-no": 32, "age": 28},
    "yuka.moriya@example.com": {"name": "守屋 由佳", "orgcode": "sales-sales2", "employee-no": 33, "age": 35},
    "tomo.suzuki@example.com": {"name": "鈴木 友", "orgcode": "acct", "employee-no": 34, "age": 51},
    "toyoko.inoue@example.com": {"name": "井上 豊子", "orgcode": "acct", "employee-no": 35, "age": 37},
    "mariko.kanzaki@example.com": {"name": "神埼 真理子", "orgcode": "sales-sales1", "employee-no": 36, "age": 55},
    "nozomi.yamanaka@example.com": {"name": "山中 望美", "orgcode": "osaka-sales-pub", "employee-no": 37, "age": 47},
    "hatsune.yoshida@example.com": {"name": "吉田 初音", "orgcode": "ga", "employee-no": 38, "age": 37},
    "kanako.naito@example.com": {"name": "内藤 香菜子", "orgcode": "acct", "employee-no": 39, "age": 29},
    "mao.honda@example.com": {"name": "本多 真央", "orgcode": "ga", "employee-no": 40, "age": 19},
  })
  // 選択中の部署
  const [org, setOrg] = useState(null)
  // ドロワーの開閉
  const toggleDrawer = () => setOpen(!open)
  // データの更新
  const updateData = () => {
    setOrgObject(JSON.parse(document.getElementById('organization').value))
    setPersonObject(JSON.parse(document.getElementById('person').value))
  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline/>
        <AppBar position='absolute' open={open}>
          <Toolbar sx={{pr:'24px'}}>
            <IconButton
              edge='start'
              aria-label='open drawer'
              color='inherit'
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && {display: 'none'})
              }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              社員名簿
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              px: [1]
            }}>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
          </Toolbar>
          <Divider />
          <RootFolder orgObject={orgObject} setOrg={setOrg} />
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Box sx={{p:2, display: 'flex'}}>
              <TextField sx={{m:1, width: '50%'}}
                id='organization' label='部門データ' multiline minRows={8} maxRows={8}
                defaultValue={JSON.stringify(orgObject)} />
              <TextField sx={{m:1, width: '50%'}}
                id='person' label='社員データ' multiline minRows={8} maxRows={8}
                defaultValue={JSON.stringify(personObject)} />
          </Box>
          <Box sx={{m:1, p:1}}>
          <Button
            variant="contained"
            size='large'
            sx={{width:'100%'}}
            onClick={updateData}>
            更新
          </Button>
          </Box>
          <Divider/>
          <Box sx={{p:2}}>
            <PersonView personObject={personObject} org={org} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    );
}

export default App;
