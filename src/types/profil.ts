export interface FavoriteLanguage {
  name:  string   
  icon:  string   
  color: string   
  glow:  string 
}

export interface CurrentLanguage {
  name:     string 
  icon:     string 
  color:    string
  progress: number
  mission:  string 
}

export interface UserProfile {
  username:          string           
  title:             string           
  avatarUrl:         string          
  level:             number          
  xp:                number          
  xpToNext:          number          
  streak:            number       
  favoriteLanguages: FavoriteLanguage[] 
  currentLanguage:   CurrentLanguage 
}
